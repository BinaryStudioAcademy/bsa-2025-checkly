import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationMessage = {
	EMAIL_ALREADY_EXISTS: "Email already in use",
	EMAIL_INVALID: "Invalid email format",
	FIELD_REQUIRED: "Field is required",
	NAME_INVALID: `Name must be between ${String(UserValidationRule.NAME_MIN_LENGTH)} and ${String(UserValidationRule.NAME_MAX_LENGTH)} characters`,
	PASSWORD_INVALID: `Password should contain between ${String(UserValidationRule.PASSWORD_MIN_LENGTH)} to ${String(UserValidationRule.PASSWORD_MAX_LENGTH)} characters, at least one lowercase letter, one uppercase letter and one digit`,
	USER_NOT_FOUND: "User not found",
};

export { UserValidationMessage };
