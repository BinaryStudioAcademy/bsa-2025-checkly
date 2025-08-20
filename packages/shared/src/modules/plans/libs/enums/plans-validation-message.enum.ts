import { PlanValidationRule } from "./plans-validation-rule.enum.js";

const PlanValidationMessage = {
	FIELD_REQUIRED: "Field is required",
	INTENSITY_LENGTH: `Intensity must have maximum of ${String(PlanValidationRule.INTENSITY_MAX_LENGTH)} characters`,
	TITLE_LENGTH: `Title must have maximum of ${String(PlanValidationRule.TITLE_MAX_LENGTH)} characters`,
} as const;

export { PlanValidationMessage };
