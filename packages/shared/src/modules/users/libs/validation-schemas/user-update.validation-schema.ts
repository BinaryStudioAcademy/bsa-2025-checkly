import { z } from "zod";

import { MAX_AGE, MIN_AGE } from "../../../../libs/constants/numbers.js";
import {
	UserValidationMessage,
	UserValidationRegexRule,
	UserValidationRule,
} from "../enums/enums.js";

const minAgeDate = new Date();
minAgeDate.setFullYear(minAgeDate.getFullYear() - MIN_AGE);

const maxAgeDate = new Date();
maxAgeDate.setFullYear(maxAgeDate.getFullYear() - MAX_AGE);

const userUpdate = z
	.object({
		confirmPassword: z.string().trim().optional().or(z.literal("").optional()),
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

					const inputDate = new Date(value);

					return inputDate <= minAgeDate && inputDate >= maxAgeDate;
				},
				{
					message: UserValidationMessage.AGE_INVALID,
				},
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
	});

export { userUpdate };
