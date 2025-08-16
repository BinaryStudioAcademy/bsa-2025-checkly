import z from "zod";

import {
	QuizAnswersRule,
	QuizCategory,
	QuizValidationMessage,
} from "../enums/enums.js";
import { quizAnswerSchema } from "./quiz-shared.validation-schema.js";

const quizAnswersSchema = z.object({
	answers: z
		.array(
			quizAnswerSchema.refine((answer) => {
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
