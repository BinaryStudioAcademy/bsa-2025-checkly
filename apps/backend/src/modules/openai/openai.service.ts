import { config } from "~/libs/modules/config/config.js";

import {
	HTTPCode,
	MAX_ATTEMPTS,
	MILLISECONDS_IN_SECOND,
	MODEL_TEMPERATURE,
	ONE,
	SYSTEM_PROMPT as systemPrompt,
	ZERO,
} from "./libs/constants/constants.js";
import {
	OpenAIRole,
	PlanErrorMessage,
	ResponseFormat,
} from "./libs/enums/enums.js";
import { type GeneratedPlanDTO } from "./libs/types/types.js";
import { delay, PromptBuilder } from "./libs/utilities/utilities.js";
import {
	planCreateValidationSchema,
	taskCreateValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
import { type OpenAIModule } from "./openai.module.js";

class OpenAIService {
	private maxAttempts: number;
	private openAiModule: OpenAIModule;

	public constructor(openAiModule: OpenAIModule) {
		this.openAiModule = openAiModule;
		this.maxAttempts = MAX_ATTEMPTS;
	}

	public async generatePlan({
		assistantPrompt,
		attempts = ZERO,
		userPrompt,
	}: {
		assistantPrompt?: string;
		attempts?: number;
		userPrompt: string;
	}): Promise<GeneratedPlanDTO> {
		let answer = "";

		try {
			answer = await this.callAPI({
				assistantPrompt,
				systemPrompt,
				userPrompt,
			});

			const planData = JSON.parse(answer) as GeneratedPlanDTO;

			this.validatePlan(planData);

			return planData;
		} catch (error) {
			const { status: errorStatus } = error as { status: number };

			if (
				errorStatus === HTTPCode.BAD_REQUEST ||
				errorStatus === HTTPCode.UNAUTHORIZED ||
				errorStatus === HTTPCode.NOT_FOUND
			) {
				throw new Error(PlanErrorMessage.OPENAI_FAILED);
			}

			if (attempts + ONE >= this.maxAttempts) {
				throw new Error(PlanErrorMessage.GENERATION_FAILED);
			}

			await delay(MILLISECONDS_IN_SECOND * attempts);
			const errorMessage =
				error instanceof Error ? error.message : String(error);

			return await this.generatePlan({
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
		assistantPrompt: string | undefined;
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

	private validatePlan(generetedPlan: GeneratedPlanDTO): void {
		const planResults = planCreateValidationSchema
			.pick({ duration: true, intensity: true, title: true })
			.safeParse(generetedPlan);

		if (!planResults.success) {
			throw new Error(PlanErrorMessage.PLAN_FAILED);
		}

		if (
			!Array.isArray(generetedPlan.days) ||
			generetedPlan.days.length === ZERO
		) {
			throw new Error(PlanErrorMessage.DAYS_FAILED);
		}

		for (const [dayIndex, day] of generetedPlan.days.entries()) {
			if (
				!Array.isArray(day.tasks) ||
				day.tasks.length === ZERO ||
				day.dayNumber != dayIndex + ONE
			) {
				throw new Error(PlanErrorMessage.TASKS_FAILED);
			}

			for (const task of day.tasks) {
				const taskResult = taskCreateValidationSchema
					.pick({
						description: true,
						executionTimeType: true,
						order: true,
						title: true,
					})
					.safeParse(task);

				if (!taskResult.success) {
					throw new Error(PlanErrorMessage.TASK_FAILED);
				}
			}
		}
	}
}

export { OpenAIService };
