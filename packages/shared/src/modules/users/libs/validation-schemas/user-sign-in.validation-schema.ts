import { z } from "zod";

import {
	UserValidationMessage,
	UserValidationRegexRule,
	UserValidationRule,
} from "../enums/enums.js";

type UserSignInRequestValidationDto = {
	email: z.ZodString;
	password: z.ZodString;
};

const userSignIn = z
	.object<UserSignInRequestValidationDto>({
		email: z
			.string()
			.trim()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRED,
			})
			.regex(UserValidationRegexRule.EMAIL_VALID_CHARS_MIN_MAX, {
				message: UserValidationMessage.EMAIL_INVALID,
			}),
		password: z
			.string()
			.trim()
			.min(UserValidationRule.PASSWORD_MIN_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRED,
			})
			.regex(UserValidationRegexRule.PASSWORD_VALID_CHARS_MIN_MAX, {
				message: UserValidationMessage.PASSWORD_INVALID,
			}),
	})
	.required();

export { userSignIn };