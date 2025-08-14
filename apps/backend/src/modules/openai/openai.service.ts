import OpenAI from "openai";

import { config } from "~/libs/modules/config/config.js";

import {
	HTTPCode,
	MAX_ATTEMPTS,
	MILLISECONDS_IN_SECOND,
	ONE,
	SYSTEM_PROMPT as systemPrompt,
	TEMPERATURE,
	ZERO,
} from "./libs/constants/constants.js";
import { OpenAIRoles, PlanErrorMessages } from "./libs/enums/enums.js";
import { ResponseFormats } from "./libs/enums/response-formats.js";
import { type GeneratedPlanDTO } from "./libs/types/types.js";
import { PromptBuilder } from "./libs/utilities/utilities.js";
import {
	planCreateValidationSchema,
	taskCreateValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

class OpenAIService {
	private maxAttempts: number;
	private openai: OpenAI;

	public constructor() {
		this.openai = new OpenAI({
			apiKey: config.ENV.OPEN_AI.OPEN_AI_KEY,
		});
		this.maxAttempts = MAX_ATTEMPTS;
	}

	public async generatePlan(
		userPrompt: string,
		attempts: number = ZERO,
		assistantPrompt?: string,
	): Promise<GeneratedPlanDTO> {
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
				throw new Error(PlanErrorMessages.OPENAI_FAILED);
			}

			if (attempts + ONE >= this.maxAttempts) {
				throw new Error(PlanErrorMessages.GENERATION_FAILED);
			}

			await new Promise((resolve) =>
				setTimeout(resolve, MILLISECONDS_IN_SECOND * attempts),
			);

			const errorMessage =
				error instanceof Error ? error.message : String(error);

			return await this.generatePlan(
				userPrompt,
				attempts + ONE,
				PromptBuilder.create()
					.addError(errorMessage)
					.addPreviousResponse(answer)
					.build(),
			);
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
		const response = await this.openai.chat.completions.create({
			messages: [
				{ content: userPrompt, role: OpenAIRoles.USER },
				{ content: systemPrompt, role: OpenAIRoles.SYSTEM },
				...(assistantPrompt
					? [{ content: assistantPrompt, role: OpenAIRoles.ASSISTANT }]
					: []),
			],
			model: config.ENV.OPEN_AI.TEXT_GENERATION_MODEL,
			response_format: { type: ResponseFormats.JSON_OBJECT },
			temperature: TEMPERATURE,
		});

		return response.choices[ZERO]?.message.content || "{}";
	}

	private validatePlan(generetedPlan: GeneratedPlanDTO): void {
		const planResults = planCreateValidationSchema
			.pick({ duration: true, intensity: true, title: true })
			.safeParse(generetedPlan);

		if (!planResults.success) {
			throw new Error(PlanErrorMessages.PLAN_FAILED);
		}

		if (
			!Array.isArray(generetedPlan.days) ||
			generetedPlan.days.length === ZERO
		) {
			throw new Error(PlanErrorMessages.DAYS_FAILED);
		}

		for (const [dayIndex, day] of generetedPlan.days.entries()) {
			if (
				!Array.isArray(day.tasks) ||
				day.tasks.length === ZERO ||
				day.dayNumber != dayIndex + ONE
			) {
				throw new Error(PlanErrorMessages.TASKS_FAILED);
			}

			for (const [, task] of day.tasks.entries()) {
				const taskResult = taskCreateValidationSchema
					.pick({
						description: true,
						executionTimeType: true,
						order: true,
						title: true,
					})
					.safeParse(task);

				if (!taskResult.success) {
					throw new Error(PlanErrorMessages.TASK_FAILED);
				}
			}
		}
	}
}

export { OpenAIService };
