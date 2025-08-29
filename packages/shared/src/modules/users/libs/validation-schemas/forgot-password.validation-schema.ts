import { z } from "zod";

import {
	UserValidationMessage,
	UserValidationRegexRule,
	UserValidationRule,
} from "../enums/enums.js";

type ForgotPasswordRequestValidationDto = {
	email: z.ZodString;
};

const forgotPassword = z
	.object<ForgotPasswordRequestValidationDto>({
		email: z
			.string({
				invalid_type_error: UserValidationMessage.EMAIL_INVALID_TYPE,
			})
			.trim()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRED,
			})
			.regex(UserValidationRegexRule.EMAIL_VALID_CHARS_MIN_MAX, {
				message: UserValidationMessage.EMAIL_INVALID,
			}),
	})
	.required();

export { forgotPassword };
