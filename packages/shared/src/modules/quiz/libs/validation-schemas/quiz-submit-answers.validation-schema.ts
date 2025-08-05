import z from "zod";

import { QuizValidationMessage } from "../enums/enums.js";

const sanitizeTextInput = (input: string): string =>
	input
		.trim()
		.replaceAll(/[<>'"&]/g, "")
		.replaceAll(/\s+/g, " ");

const quizAnswers = z.object({
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

				const ZERO = 0;
				const hasAnySelectedOptions = selectedOptions.length > ZERO;
				const hasUserInput = Boolean(userInput);

				return hasAnySelectedOptions || hasUserInput;
			}, QuizValidationMessage.NON_SKIPPED_QUESTION),
	),
	category: z.string(),
	notes: z.string().trim().optional().default(""),
});

export { quizAnswers };
