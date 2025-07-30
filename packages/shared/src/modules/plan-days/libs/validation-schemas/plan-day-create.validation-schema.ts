import { z } from "zod";

import {
	PlanDayValidationMessage,
	PlanDayValidationRule,
} from "../enums/enums.js";

const planDayCreate = z.object({
	dayNumber: z.number().min(PlanDayValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
		message: PlanDayValidationMessage.FIELD_REQUIRED,
	}),
	isRegenerated: z.boolean().optional().default(false),
	planId: z.number().nullable().optional(),
});

export { planDayCreate };
