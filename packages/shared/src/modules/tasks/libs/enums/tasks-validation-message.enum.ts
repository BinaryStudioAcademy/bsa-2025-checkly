import { TaskValidationRule } from "./tasks-validation-rule.enum.js";

const TaskValidationMessage = {
	DESCRIPTION_LENGTH: `Description must have maximum of ${String(TaskValidationRule.DESCRIPTION_MAX_LENGTH)} characters`,
	FIELD_REQUIRED: "Field is required",
	TITLE_LENGTH: `Ttile must have maximum of ${String(TaskValidationRule.TITLE_MAX_LENGTH)} characters`,
};

export { TaskValidationMessage };
