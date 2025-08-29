import { z } from "zod";

import {
	ExecutionTimeType,
	TaskValidationMessage,
	TaskValidationRule,
} from "../enums/enums.js";

const taskCreate = z.object({
	executionTimeType: z
		.nativeEnum(ExecutionTimeType)
		.nullable()
		.optional()
		.default(null),
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
	title: z
		.string()
		.trim()
		.min(TaskValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
			message: TaskValidationMessage.FIELD_REQUIRED,
		})
		.max(TaskValidationRule.TITLE_MAX_LENGTH, {
			message: TaskValidationMessage.TITLE_LENGTH,
		}),
});

const tasksEdit = z.object({
	tasks: z.array(taskCreate),
});

const taskCreatePartial = taskCreate.pick({
	executionTimeType: true,
	title: true,
});

type TaskCreateFormValues = z.infer<typeof taskCreatePartial>;

type TaskCreateRequestDto = z.infer<typeof taskCreate>;

export {
	taskCreate,
	type TaskCreateFormValues,
	taskCreatePartial,
	type TaskCreateRequestDto,
	tasksEdit,
};
