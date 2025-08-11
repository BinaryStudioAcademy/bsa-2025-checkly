import { z } from "zod";

import {
	FeedbackValidationMessage,
	FeedbackValidationRule,
} from "../emums/enums.js";

const feedbackUpdateValidationSchema = z.object({
	text: z
		.string()
		.trim()
		.min(FeedbackValidationRule.TEXT_MIN_LENGTH, {
			message: FeedbackValidationMessage.TEXT_REQUIRED,
		})
		.max(FeedbackValidationRule.TEXT_MAX_LENGTH, {
			message: FeedbackValidationMessage.TEXT_LENGTH,
		}),
});

export { feedbackUpdateValidationSchema };
