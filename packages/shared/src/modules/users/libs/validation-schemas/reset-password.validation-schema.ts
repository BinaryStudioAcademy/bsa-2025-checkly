import { z } from "zod";

import {
	UserValidationMessage,
	UserValidationRegexRule,
	UserValidationRule,
} from "../enums/enums.js";

const resetPassword = z
	.object({
		password: z
			.string()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRED,
			})
			.regex(UserValidationRegexRule.PASSWORD_VALID_CHARS_MIN_MAX, {
				message: UserValidationMessage.PASSWORD_INVALID,
			}),
	})
	.required()
	.extend({
		confirmPassword: z.string().trim(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: UserValidationMessage.PASSWORD_DOES_NOT_MATCH,
		path: ["confirmPassword"],
	});

type ResetPasswordFormValidationSchema = z.infer<typeof resetPassword>;

export { resetPassword, type ResetPasswordFormValidationSchema };
