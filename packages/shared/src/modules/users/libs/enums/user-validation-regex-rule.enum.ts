import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationRegexRule = {
	EMAIL_PATTERN: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
	NAME_VALID_CHARS_MIN_MAX: new RegExp(
		`^[a-zA-Z0-9_-]{${String(UserValidationRule.NAME_MINIMUM_LENGTH)},${String(UserValidationRule.NAME_MAXIMUM_LENGTH)}}$`,
	),
	PASSWORD_CONTAINS_LETTER_NUMBER_AND_LENGTH: new RegExp(
		`^(?=.*[A-Za-z])(?=.*\\d).{${String(UserValidationRule.PASSWORD_MINIMUM_LENGTH)},${String(UserValidationRule.PASSWORD_MAXIMUM_LENGTH)}}$`,
	),
	PASSWORD_VALID_CHARS: /^[\d!#$@A-Za-z]*$/,
} as const;

export { UserValidationRegexRule };
