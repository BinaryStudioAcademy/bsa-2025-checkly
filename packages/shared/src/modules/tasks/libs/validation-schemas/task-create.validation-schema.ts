import { z } from "zod";

import {
	ExecutionTimeType,
	TaskValidationMessage,
	TaskValidationRule,
} from "../enums/enums.js";

const taskCreate = z.object({
	description: z
		.string()
		.trim()
		.min(TaskValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
			message: TaskValidationMessage.FIELD_REQUIRED,
		}),
	executionTimeType: z
		.enum(Object.values(ExecutionTimeType) as [string, ...string[]])
		.optional()
		.default("morning"),
	isCompleted: z.boolean().optional().default(false),
	isCustom: z.boolean().optional().default(false),
	order: z
		.number({
			required_error: TaskValidationMessage.FIELD_REQUIRED,
		})
		.int()
		.positive(),
	parentTaskId: z.number().nullable().optional(),
	planDayId: z
		.number({
			required_error: TaskValidationMessage.FIELD_REQUIRED,
		})
		.int()
		.positive(),
	title: z.string().trim().min(TaskValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
		message: TaskValidationMessage.FIELD_REQUIRED,
	}),
});

export { taskCreate };
