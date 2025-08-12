import { sanitizeTextInput } from "shared";
import z from "zod";

import { QuizCategory, QuizValidationMessage } from "../enums/enums.js";

const ZERO_ARRAY_LENGTH = 0;

const quizAnswersSchema = z.object({
	answers: z.array(
		z
			.object({
				isSkipped: z.boolean(),
				questionId: z.number().int().positive(),
				selectedOptions: z.array(
					z.union([z.number().int().positive(), z.string().trim()]),
				),
				userInput: z.preprocess(
					(value) =>
						typeof value === "string" ? sanitizeTextInput(value) : "",
					z.string().default(""),
				),
			})
			.refine((answer) => {
				const { isSkipped, selectedOptions, userInput } = answer;

				if (isSkipped) {
					return true;
				}

				const hasAnySelectedOptions =
					selectedOptions.length > ZERO_ARRAY_LENGTH;
				const hasUserInput = Boolean(userInput);

				return hasAnySelectedOptions || hasUserInput;
			}, QuizValidationMessage.NON_SKIPPED_QUESTION),
	),
	category: z.nativeEnum(QuizCategory),
	notes: z.string().trim().optional().default(""),
});

export { quizAnswersSchema };
