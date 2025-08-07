import { z } from "zod";

import {
	UserValidationMessage,
	UserValidationRegexRule,
	UserValidationRule,
} from "../enums/enums.js";

type UserSignInRequestValidationDto = {
	email: z.ZodEffects<z.ZodString, string, string>;
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
			.refine(
				(email) => {
					const [local, domain] = email.split("@");

					if (!local || !domain) {
						return true;
					}

					return (
						UserValidationRegexRule.LOCAL_REGEX.test(local) &&
						UserValidationRegexRule.DOMAIN_REGEX.test(domain)
					);
				},
				{
					message: UserValidationMessage.EMAIL_INVALID,
				},
			),
		password: z
			.string()
			.trim()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRED,
			})
			.regex(UserValidationRegexRule.PASSWORD_VALID_CHARS_MIN_MAX, {
				message: UserValidationMessage.PASSWORD_INVALID,
			}),
	})
	.required();

export { userSignIn };
