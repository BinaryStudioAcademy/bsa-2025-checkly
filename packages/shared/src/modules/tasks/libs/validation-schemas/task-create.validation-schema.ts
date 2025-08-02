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
		.nativeEnum(ExecutionTimeType)
		.optional()
		.default("morning"),
	isCompleted: z.boolean().optional().default(false),
	order: z
		.number({
			required_error: TaskValidationMessage.FIELD_REQUIRED,
		})
		.int()
		.positive(),
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

type TaskCreateRequestDto = z.infer<typeof taskCreate>;

export { taskCreate, type TaskCreateRequestDto };
