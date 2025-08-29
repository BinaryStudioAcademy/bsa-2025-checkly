import { z } from "zod";

import { textValidationSchema } from "./feedback-text-validation-schema.js";

const feedbackCreateValidationSchema = z.object({
	text: textValidationSchema,
});

export { feedbackCreateValidationSchema };
