import { z } from "zod";

import {
	UserValidationMessage,
	UserValidationRegexRule,
	UserValidationRule,
} from "../enums/enums.js";

const resetPasswordWithToken = z.object({
	password: z
		.string()
		.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
			message: UserValidationMessage.FIELD_REQUIRED,
		})
		.regex(UserValidationRegexRule.PASSWORD_VALID_CHARS_MIN_MAX, {
			message: UserValidationMessage.PASSWORD_INVALID,
		}),
	token: z.string().min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
		message: UserValidationMessage.FIELD_REQUIRED,
	}),
	userId: z.number().int().positive(),
});

export { resetPasswordWithToken };
