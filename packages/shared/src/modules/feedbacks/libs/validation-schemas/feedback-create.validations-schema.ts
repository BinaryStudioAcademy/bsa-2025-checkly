import { z } from "zod";

import {
	FeedbackValidationMessage,
	FeedbackValidationRegexRule,
	FeedbackValidationRule,
} from "../emums/enums.js";

const feedbackCreateValidationSchema = z.object({
	text: z
		.string()
		.trim()
		.min(FeedbackValidationRule.TEXT_MIN_LENGTH, {
			message: FeedbackValidationMessage.TEXT_REQUIRED,
		})
		.max(FeedbackValidationRule.TEXT_MAX_LENGTH, {
			message: FeedbackValidationMessage.TEXT_LENGTH,
		})
		.regex(FeedbackValidationRegexRule.TEXT_VALID_CHARS, {
			message: FeedbackValidationMessage.TEXT_INVALID_CHARS,
		}),
	userId: z.number().int().positive({
		message: FeedbackValidationMessage.USER_ID_MUST_BE_A_POSITIVE_INTEGER,
	}),
});

export { feedbackCreateValidationSchema };
