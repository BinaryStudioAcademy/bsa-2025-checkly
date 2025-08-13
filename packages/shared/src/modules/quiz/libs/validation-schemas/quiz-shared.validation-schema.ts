import z from "zod";

import { QuizAnswersRule } from "../enums/quiz-answers-rules.enum.js";
import { QuizValidationMessage } from "../enums/quiz-validation-message.enum.js";
import { sanitizeTextInput } from "../utilities/utilities.js";

const quizAnswerSchema = z.object({
	isSkipped: z.boolean(),
	questionId: z.coerce.number().int().positive(),
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
		(value) => (typeof value === "string" ? sanitizeTextInput(value) : ""),
		z.string().default(""),
	),
});

export { quizAnswerSchema };
