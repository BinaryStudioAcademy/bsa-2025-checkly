import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationRegexRule = {
	EMAIL_VALID_CHARS_MIN_MAX: new RegExp(
		`^(?!\\.)((?!\\.{2})[\\w!#$%&'*+=?^\`{|}~./-]){${String(UserValidationRule.EMAIL_LOCAL_MIN_LENGTH)},${String(UserValidationRule.EMAIL_LOCAL_MAX_LENGTH)}}(?<!\\.)@(?![-.])(?=.{${String(UserValidationRule.EMAIL_DOMAIN_MIN_LENGTH)},${String(UserValidationRule.EMAIL_DOMAIN_MAX_LENGTH)}}$)[\\dA-Za-z]+(?:-[\\dA-Za-z]+)*(?:\\.[\\dA-Za-z]+(?:-[\\dA-Za-z]+)*)+(?<![-.])$`,
	),
	NAME_VALID_CHARS: /^[A-Za-z\s-]+$/,
	NAME_VALID_SURROUNDING: /^(?![\s-]).*(?<![\s-])$/,
	PASSWORD_VALID_CHARS_MIN_MAX: new RegExp(
		`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[\\S]{${String(UserValidationRule.PASSWORD_MIN_LENGTH)},${String(UserValidationRule.PASSWORD_MAX_LENGTH)}}$`,
	),
} as const;

export { UserValidationRegexRule };
