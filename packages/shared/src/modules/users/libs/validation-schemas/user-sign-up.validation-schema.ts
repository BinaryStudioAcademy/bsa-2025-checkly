import { z } from "zod";

import {
	UserValidationMessage,
	UserValidationRegexRule,
	UserValidationRule,
} from "../enums/enums.js";

const userSignUp = z
	.object({
		email: z
			.string()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRED,
			})
			.regex(UserValidationRegexRule.EMAIL_VALID_CHARS_MIN_MAX, {
				message: UserValidationMessage.EMAIL_INVALID,
			}),
		name: z
			.string()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRED,
			})
			.min(UserValidationRule.NAME_MIN_LENGTH, {
				message: UserValidationMessage.NAME_LENGTH,
			})
			.max(UserValidationRule.NAME_MAX_LENGTH, {
				message: UserValidationMessage.NAME_LENGTH,
			})
			.refine(
				(value) => UserValidationRegexRule.NAME_VALID_SURROUNDING.test(value),
				{
					message: UserValidationMessage.NAME_SURROUNDING_RULE,
				},
			)
			.refine((value) => UserValidationRegexRule.NAME_VALID_CHARS.test(value), {
				message: UserValidationMessage.NAME_ONLY_ALLOWED_CHARS,
			}),
		password: z
			.string()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRED,
			})
			.regex(UserValidationRegexRule.PASSWORD_VALID_CHARS_MIN_MAX, {
				message: UserValidationMessage.PASSWORD_INVALID,
			}),
	})
	.required();

export { userSignUp };
