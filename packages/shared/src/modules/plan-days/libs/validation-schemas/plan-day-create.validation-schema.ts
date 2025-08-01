import { z } from "zod";

import {
	PlanDayValidationMessage,
	PlanDayValidationRule,
} from "../enums/enums.js";

const planDayCreate = z.object({
	dayNumber: z.number().min(PlanDayValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
		message: PlanDayValidationMessage.FIELD_REQUIRED,
	}),
	planId: z.number(),
});

type PlanDayCreateRequestDto = z.infer<typeof planDayCreate>;

export { planDayCreate, type PlanDayCreateRequestDto };
