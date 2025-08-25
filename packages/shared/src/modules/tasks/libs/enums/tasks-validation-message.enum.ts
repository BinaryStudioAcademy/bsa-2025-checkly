import { TaskValidationRule } from "./tasks-validation-rule.enum.js";

const TaskValidationMessage = {
	FIELD_REQUIRED: "Field is required",
	TITLE_LENGTH: `Ttile must have maximum of ${String(TaskValidationRule.TITLE_MAX_LENGTH)} characters`,
};

export { TaskValidationMessage };
