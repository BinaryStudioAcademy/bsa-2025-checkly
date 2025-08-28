import { z } from "zod";

import { ONE } from "../../../../libs/constants/numbers.js";
import { PlanCalendarExportConst } from "../enums/plan-calendar-export-const.enum.js";
import { PlanCalendarExportMessage } from "../enums/plan-calendar-export-message.enum.js";
import { PlanCalendarExportRegexRule } from "../enums/plan-calendar-export-regex-rule.enum.js";
import { getUtcMidnightDate } from "../helpers/data-helper.js";
import { PlanDurationDaysEnum } from "../types/plan-duration-days.type.js";

const taskSchema = z.object({
	notes: z
		.string()
		.trim()
		.max(PlanCalendarExportConst.NOTE_LENGTH)
		.optional()
		.or(z.literal("").transform(() => {})),
	title: z
		.string()
		.trim()
		.min(ONE, { message: PlanCalendarExportMessage.TASK_TITLE_REQUIRED }),
});

const daySchema = z.object({
	day: z.number().int().positive(),
	tasks: z.array(taskSchema).length(PlanCalendarExportConst.TASKS_IN_DAY, {
		message: PlanCalendarExportMessage.DAYS_LENGTH_INVALID,
	}),
});

const planCalendarExportSchema = z
	.object({
		days: z.array(daySchema),
		durationDays: z.union([
			z.literal(PlanDurationDaysEnum.FIVE),
			z.literal(PlanDurationDaysEnum.FOURTEEN),
			z.literal(PlanDurationDaysEnum.TWENTY_ONE),
		]),
		startDate: z.string().regex(PlanCalendarExportRegexRule.DATE_VALID, {
			message: PlanCalendarExportMessage.START_DATE_INVALID,
		}),
	})
	.superRefine((data, context) => {
		const duration = data.durationDays;

		if (data.days.length !== duration) {
			context.addIssue({
				code: z.ZodIssueCode.custom,
				message: PlanCalendarExportMessage.DAYS_UNIQUE_INVALID.replace(
					"{duration}",
					String(duration),
				),
				path: ["days"],
			});
		}

		const seen = new Set<number>();

		for (const [index, d] of data.days.entries()) {
			if (d.day < ONE || d.day > duration) {
				context.addIssue({
					code: z.ZodIssueCode.custom,
					message: PlanCalendarExportMessage.DAY_INVALID.replace(
						"{duration}",
						String(duration),
					),
					path: ["days", index, "day"],
				});
			}

			if (seen.has(d.day)) {
				context.addIssue({
					code: z.ZodIssueCode.custom,
					message: PlanCalendarExportMessage.DAY_DUPLICATED.replace(
						"{day}",
						String(d.day),
					),
					path: ["days", index, "day"],
				});
			}

			seen.add(d.day);
		}

		const date = getUtcMidnightDate(data.startDate);

		if (Number.isNaN(date.getTime())) {
			context.addIssue({
				code: z.ZodIssueCode.custom,
				message: PlanCalendarExportMessage.START_DATE_INVALID,
				path: ["startDate"],
			});
		}
	});

type ExportDataDto = z.infer<typeof planCalendarExportSchema>;

export { type ExportDataDto, planCalendarExportSchema };
