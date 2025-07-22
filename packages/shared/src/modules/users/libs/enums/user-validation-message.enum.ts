import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationMessage = {
	EMAIL_REQUIRE: "Email is required",
	EMAIL_TAKEN: "Email is taken",
	EMAIL_WRONG: "Email is wrong",
	FIELD_REQUIRED: "Field is required",
	NAME_INVALID_CHARACTERS: `Please enter a valid name. Your name must be between ${String(UserValidationRule.NAME_MINIMUM_LENGTH)} and ${String(UserValidationRule.NAME_MAXIMUM_LENGTH)} characters. Only Latin letters, numbers, hyphens, and underscores are allowed`,
	NAME_TAKEN: "Name is taken",
	PASSWORD_INVALID_CHARACTERS:
		"Your password contains invalid characters. Only letters, numbers, and ! @ # $ symbols are allowed",
	PASSWORD_MAX_LENGTH: `Password must be at most ${String(
		UserValidationRule.PASSWORD_MAXIMUM_LENGTH,
	)} characters long`,
	PASSWORD_MIN_LENGTH: `Password must be at least ${String(
		UserValidationRule.PASSWORD_MINIMUM_LENGTH,
	)} characters long`,
	PASSWORD_REQUIRES_CHARACTER: `Your password must be between ${String(UserValidationRule.PASSWORD_MINIMUM_LENGTH)} and ${String(UserValidationRule.PASSWORD_MAXIMUM_LENGTH)} characters, and include at least one letter and one number`,
	PASSWORD_REQUIRES_LETTER_AND_NUMBER:
		"Password must include at least one letter and one number",
} as const;

export { UserValidationMessage };
