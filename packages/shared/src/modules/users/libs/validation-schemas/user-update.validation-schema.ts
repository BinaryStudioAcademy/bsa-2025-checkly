import { z } from "zod";

import {
	UserValidationMessage,
	UserValidationRegexRule,
	UserValidationRule,
} from "../enums/enums.js";

const MAX_AGE = 150;

const userUpdate = z
	.object({
		confirmPassword: z.string().trim().optional().or(z.literal("").optional()),
		currentPassword: z.string().trim().optional().or(z.literal("").optional()),
		dob: z
			.string()
			.trim()
			.refine(
				(value) =>
					value === "" || UserValidationRegexRule.DATE_VALID.test(value),
				{
					message: UserValidationMessage.DATE_INVALID,
				},
			)
			.refine(
				(value) => {
					if (!value) {
						return true;
					}

					const date = new Date(value);
					const today = new Date();

					return date <= today;
				},
				{
					message: UserValidationMessage.DATE_OF_BIRTH_CANNOT_BE_IN_THE_FUTURE,
				},
			)
			.refine(
				(value) => {
					if (!value) {
						return true;
					}

					const date = new Date(value);
					const maxAge = new Date();
					maxAge.setFullYear(maxAge.getFullYear() - MAX_AGE);

					return date >= maxAge;
				},
				{ message: UserValidationMessage.ENTER_VALID_DATE_OF_BIRTH },
			)
			.nullable()
			.optional(),
		email: z
			.string()
			.trim()
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
			.trim()
			.regex(UserValidationRegexRule.PASSWORD_VALID_CHARS_MIN_MAX, {
				message: UserValidationMessage.PASSWORD_INVALID,
			})
			.optional()
			.or(z.literal("").optional()),
	})
	.refine((data) => (data.password ?? "") === (data.confirmPassword ?? ""), {
		message: UserValidationMessage.PASSWORD_DOES_NOT_MATCH,
		path: ["confirmPassword"],
	})
	.refine(
		(data) => {
			const hasPassword = (data.password ?? "").trim() !== "";
			const hasCurrentPassword = (data.currentPassword ?? "").trim() !== "";

			return !hasPassword || hasCurrentPassword;
		},
		{
			message: UserValidationMessage.CURRENT_PASSWORD_REQUIRED,
			path: ["currentPassword"],
		},
	);

export { userUpdate };
