import { z } from "zod";

import { PlanValidationMessage, PlanValidationRule } from "../enums/enums.js";

const planCreate = z.object({
	categoryId: z.number({
		required_error: PlanValidationMessage.FIELD_REQUIRED,
	}),
	duration: z
		.number({
			required_error: PlanValidationMessage.FIELD_REQUIRED,
		})
		.int()
		.positive(),
	intensity: z
		.string()
		.trim()
		.min(PlanValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
			message: PlanValidationMessage.FIELD_REQUIRED,
		})
		.max(PlanValidationRule.INTENSITY_MAX_LENGTH, {
			message: PlanValidationMessage.INTENSITY_LENGTH,
		}),
	quizId: z.number({
		required_error: PlanValidationMessage.FIELD_REQUIRED,
	}),
	styleId: z
		.number({
			required_error: PlanValidationMessage.FIELD_REQUIRED,
		})
		.int()
		.positive(),
	title: z
		.string()
		.trim()
		.min(PlanValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
			message: PlanValidationMessage.FIELD_REQUIRED,
		})
		.max(PlanValidationRule.TITLE_MAX_LENGTH, {
			message: PlanValidationMessage.TITLE_LENGTH,
		}),
	userId: z
		.number({
			required_error: PlanValidationMessage.FIELD_REQUIRED,
		})
		.nullable(),
});

type PlanCreateRequestDto = z.infer<typeof planCreate>;

export { planCreate, type PlanCreateRequestDto };
