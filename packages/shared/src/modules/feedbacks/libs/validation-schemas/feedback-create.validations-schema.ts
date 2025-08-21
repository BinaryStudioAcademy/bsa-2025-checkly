import { z } from "zod";

import { FeedbackValidationMessage } from "../emums/enums.js";
import { textValidationSchema } from "./feedback-text-validation-schema.js";

const feedbackCreateValidationSchema = z.object({
	text: textValidationSchema,
	userId: z.number().int().positive({
		message: FeedbackValidationMessage.USER_ID_MUST_BE_A_POSITIVE_INTEGER,
	}),
});

export { feedbackCreateValidationSchema };
