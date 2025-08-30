import { config } from "~/libs/modules/config/config.js";

import {
	HTTPCode,
	MAX_ATTEMPTS,
	MILLISECONDS_IN_SECOND,
	MODEL_TEMPERATURE,
	ONE,
	SYSTEM_PROMPTS,
	ZERO,
} from "./libs/constants/constants.js";
import {
	OpenAIRole,
	PlanAction,
	PlanErrorMessage,
	ResponseFormat,
} from "./libs/enums/enums.js";
import {
	type GeneratedDayDTO,
	type GeneratedPlanDTO,
	type GeneratedTaskDTO,
	type PlanActionType,
	type PlanActionTypeMap,
} from "./libs/types/types.js";
import { delay, PromptBuilder } from "./libs/utilities/utilities.js";
import {
	planCreateValidationSchema,
	taskCreateValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
import { type OpenAIModule } from "./openai.module.js";

class OpenAIService {
	private maxAttempts: number;
	private openAiModule: OpenAIModule;

	private validationHandlers = {
		day: (data: unknown): void => {
			this.validateDay(data as GeneratedDayDTO, ZERO);
		},
		plan: (data: unknown): void => {
			this.validatePlan(data as GeneratedPlanDTO);
		},
		task: (data: unknown): void => {
			this.validateTask(data as GeneratedTaskDTO);
		},
	};

	public constructor(openAiModule: OpenAIModule) {
		this.openAiModule = openAiModule;
		this.maxAttempts = MAX_ATTEMPTS;
	}

	public async generate<T extends PlanActionType>({
		actionType = PlanAction.PLAN as T,
		assistantPrompt,
		attempts = ZERO,
		userPrompt,
	}: {
		actionType: T;
		assistantPrompt?: string;
		attempts?: number;
		userPrompt: string;
	}): Promise<PlanActionTypeMap[T]> {
		let answer = "";

		try {
			answer = await this.callAPI({
				assistantPrompt,
				systemPrompt: SYSTEM_PROMPTS[actionType] as string,
				userPrompt,
			});

			const data = JSON.parse(answer) as PlanActionTypeMap[T];

			this.validationHandlers[actionType](data);

			return data;
		} catch (error) {
			const { status: errorStatus } = error as { status: number };

			const isOpenAIError = (
				[
					HTTPCode.BAD_REQUEST,
					HTTPCode.NOT_FOUND,
					HTTPCode.UNAUTHORIZED,
				] as number[]
			).includes(errorStatus);

			if (isOpenAIError) {
				throw new Error(
					`${PlanErrorMessage.OPENAI_FAILED} (status: ${String(errorStatus)})`,
				);
			}

			if (attempts + ONE >= this.maxAttempts) {
				throw new Error(PlanErrorMessage.GENERATION_FAILED);
			}

			await delay(MILLISECONDS_IN_SECOND * attempts);
			const errorMessage =
				error instanceof Error ? error.message : String(error);

			return await this.generate({
				actionType,
				assistantPrompt: PromptBuilder.create()
					.addError(errorMessage)
					.addPreviousResponse(answer)
					.build(),
				attempts: attempts + ONE,
				userPrompt,
			});
		}
	}

	private async callAPI({
		assistantPrompt,
		systemPrompt,
		userPrompt,
	}: {
		assistantPrompt?: string;
		systemPrompt: string;
		userPrompt: string;
	}): Promise<string> {
		const response = await this.openAiModule.client.chat.completions.create({
			messages: [
				{ content: userPrompt, role: OpenAIRole.USER },
				{ content: systemPrompt, role: OpenAIRole.SYSTEM },
				...(assistantPrompt
					? [{ content: assistantPrompt, role: OpenAIRole.ASSISTANT }]
					: []),
			],
			model: config.ENV.OPEN_AI.TEXT_GENERATION_MODEL,
			response_format: { type: ResponseFormat.JSON_OBJECT },
			temperature: MODEL_TEMPERATURE,
		});

		return response.choices[ZERO]?.message.content || "{}";
	}

	private validateDay(day: GeneratedDayDTO, dayIndex: number): void {
		if (
			!Array.isArray(day.tasks) ||
			day.tasks.length === ZERO ||
			day.dayNumber !== dayIndex + ONE
		) {
			throw new Error(PlanErrorMessage.TASKS_FAILED);
		}

		for (const task of day.tasks) {
			this.validateTask(task);
		}
	}

	private validatePlan(plan: GeneratedPlanDTO): void {
		const result = planCreateValidationSchema
			.pick({ duration: true, intensity: true, title: true })
			.safeParse(plan);

		if (!result.success) {
			throw new Error(PlanErrorMessage.PLAN_FAILED);
		}

		if (!Array.isArray(plan.days) || plan.days.length === ZERO) {
			throw new Error(PlanErrorMessage.DAYS_FAILED);
		}

		for (const [index, day] of plan.days.entries()) {
			this.validateDay(day, index);
		}
	}

	private validateTask(task: GeneratedTaskDTO): void {
		const result = taskCreateValidationSchema
			.pick({
				executionTimeType: true,
				order: true,
				title: true,
			})
			.safeParse(task);

		if (!result.success) {
			throw new Error(PlanErrorMessage.TASK_FAILED);
		}
	}
}

export { OpenAIService };
