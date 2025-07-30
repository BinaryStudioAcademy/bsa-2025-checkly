import { z } from "zod";

import { PlanValidationMessage, PlanValidationRule } from "../enums/enums.js";

const planCreate = z.object({
	duration: z
		.string()
		.trim()
		.min(PlanValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
			message: PlanValidationMessage.FIELD_REQUIRED,
		}),
	intensity: z
		.string()
		.trim()
		.min(PlanValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
			message: PlanValidationMessage.FIELD_REQUIRED,
		}),
	isActive: z.boolean().optional().default(true),
	parentPlanId: z.number().nullable().optional(),
	title: z.string().trim().min(PlanValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
		message: PlanValidationMessage.FIELD_REQUIRED,
	}),
	userId: z.number({
		required_error: PlanValidationMessage.FIELD_REQUIRED,
	}),
});

export { planCreate };
