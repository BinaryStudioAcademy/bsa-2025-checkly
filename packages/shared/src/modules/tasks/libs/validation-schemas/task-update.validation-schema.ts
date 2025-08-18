import { z } from "zod";

import { TaskValidationMessage } from "../enums/tasks-validation-message.enum.js";
import { TaskValidationRule } from "../enums/tasks-validation-rule.enum.js";

const taskUpdate = z
	.object({
		description: z
			.string()
			.max(TaskValidationRule.DESCRIPTION_MAX_LENGTH, {
				message: TaskValidationMessage.DESCRIPTION_LENGTH,
			})
			.optional(),
		title: z
			.string()
			.max(TaskValidationRule.TITLE_MAX_LENGTH, {
				message: TaskValidationMessage.TITLE_LENGTH,
			})
			.optional(),
	})
	.partial();

export { taskUpdate };
