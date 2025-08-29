import { z } from "zod";

import { ONE } from "../../../../libs/constants/numbers.js";
import { PlanCalendarExportMessage } from "../enums/plan-calendar-export-message.enum.js";
import { PlanCalendarExportRegexRule } from "../enums/plan-calendar-export-regex-rule.enum.js";
import { getUtcMidnightDate } from "../helpers/data-helper.js";

const planCalendarRequestSchema = z.object({
	planId: z
		.string()
		.min(ONE, { message: PlanCalendarExportMessage.PLAN_ID_REQUIRED }),
	startDate: z
		.string()
		.regex(PlanCalendarExportRegexRule.DATE_VALID, {
			message: PlanCalendarExportMessage.START_DATE_INVALID_FORMAT,
		})
		.superRefine((date, context) => {
			const parsedDate = getUtcMidnightDate(date);

			if (Number.isNaN(parsedDate.getTime())) {
				context.addIssue({
					code: z.ZodIssueCode.custom,
					message: PlanCalendarExportMessage.START_DATE_INVALID,
					path: [],
				});
			}
		}),
});

export { planCalendarRequestSchema };
