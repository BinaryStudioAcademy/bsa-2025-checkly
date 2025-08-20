import z from "zod";

import { QuestionValidationMessage } from "../enums/enums.js";

const ZERO = 0;

const questionCategorySchema = z.object({
	categoryId: z
		.string({
			required_error: QuestionValidationMessage.CATEGORY_ID_REQUIRED,
		})
		.transform((value) => {
			if (!value) {
				throw new TypeError(QuestionValidationMessage.CATEGORY_ID_REQUIRED);
			}

			const parsed = Number.parseInt(value, 10);

			if (Number.isNaN(parsed)) {
				throw new TypeError(QuestionValidationMessage.CATEGORY_ID_TYPE);
			}

			return parsed;
		})
		.refine((value) => value >= ZERO, {
			message: QuestionValidationMessage.CATEGORY_ID_POSITIVE,
		}),
});

export { questionCategorySchema };
