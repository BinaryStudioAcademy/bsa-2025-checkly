import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationRegexRule = {
	EMAIL_VALID_CHARS_MIN_MAX: new RegExp(
		`^(?!\\.)((?!\\.{2})[\\w!#$%&'*+=?^\`{|}~./-]){${String(UserValidationRule.EMAIL_LOCAL_MIN_LENGTH)},${String(UserValidationRule.EMAIL_LOCAL_MAX_LENGTH)}}(?<!\\.)@(?![-.])(?=.{${String(UserValidationRule.EMAIL_DOMAIN_MIN_LENGTH)},${String(UserValidationRule.EMAIL_DOMAIN_MAX_LENGTH)}}$)[\\dA-Za-z]+(?:-[\\dA-Za-z]+)*(?:\\.[\\dA-Za-z]+(?:-[\\dA-Za-z]+)*)+(?<![-.])$`,
	),
	NAME_VALID_CHARS_MIN_MAX: new RegExp(
		`^(?=.{${String(UserValidationRule.NAME_MIN_LENGTH)},${String(UserValidationRule.NAME_MAX_LENGTH)}}$)[a-zA-Z]+(?:[\\s-][a-zA-Z]+)*$`
	),
	PASSWORD_VALID_CHARS_MIN_MAX: new RegExp(
		`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[\\S]{${String(UserValidationRule.PASSWORD_MIN_LENGTH)},${String(UserValidationRule.PASSWORD_MAX_LENGTH)}}$`,
	),
} as const;

export { UserValidationRegexRule };
