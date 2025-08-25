import { z } from "zod";

import { textValidationSchema } from "./feedback-text-validation-schema.js";

const feedbackUpdateValidationSchema = z.object({
	text: textValidationSchema,
});

export { feedbackUpdateValidationSchema };
