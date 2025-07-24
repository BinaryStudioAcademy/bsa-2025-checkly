import { z } from "zod";

import {
	UserValidationMessage,
	UserValidationRegexRule,
	UserValidationRule,
} from "../enums/enums.js";

type UserSignUpRequestValidationDto = {
	email: z.ZodString;
	name: z.ZodString;
	password: z.ZodString;
};

const userSignUp = z
	.object<UserSignUpRequestValidationDto>({
		email: z
			.string()
			.trim()
			.min(UserValidationRule.EMAIL_LOCAL_MIN_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRED,
			})
			.regex(UserValidationRegexRule.EMAIL_VALID_CHARS_MIN_MAX, {
				message: UserValidationMessage.EMAIL_INVALID,
			}),
		name: z
			.string()
			.trim()
			.min(UserValidationRule.NAME_MIN_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRED,
			})
			.regex(UserValidationRegexRule.NAME_VALID_CHARS_MIN_MAX, {
				message: UserValidationMessage.NAME_INVALID,
			}),
		password: z.string().trim(),
	})
	.required();

export { userSignUp };
