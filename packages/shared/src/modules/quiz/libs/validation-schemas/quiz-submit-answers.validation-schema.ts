import { sanitizeTextInput } from "shared";
import z from "zod";

import {
	QuizAnswersRule,
	QuizCategory,
	QuizValidationMessage,
} from "../enums/enums.js";

const quizAnswersSchema = z.object({
	answers: z
		.array(
			z
				.object({
					isSkipped: z.boolean(),
					questionId: z.number().int().positive(),
					questionText: z
						.string()
						.trim()
						.min(QuizAnswersRule.QUESTION_TEXT_MIN_LENGTH, {
							message: QuizValidationMessage.QUESTION_TEXT_MIN_LENGTH,
						}),
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
						selectedOptions.length >= QuizAnswersRule.ANSWERS_LIST_MIN_LENGTH;
					const hasUserInput = Boolean(userInput);

					return hasAnySelectedOptions || hasUserInput;
				}, QuizValidationMessage.NON_SKIPPED_QUESTION),
		)
		.refine(
			(answers) =>
				answers.filter((answer) => !answer.isSkipped).length >=
				QuizAnswersRule.ANSWERS_LIST_MIN_LENGTH,
			{
				message: QuizValidationMessage.SKIPPED_QUESTIONS,
			},
		)
		.refine(
			(answers) => answers.length >= QuizAnswersRule.ANSWERS_LIST_MIN_LENGTH,
			{
				message: QuizValidationMessage.ANSWERS_REQUIRED,
			},
		),
	category: z.nativeEnum(QuizCategory),
	notes: z.string().trim().optional().default(""),
});

export { quizAnswersSchema };
