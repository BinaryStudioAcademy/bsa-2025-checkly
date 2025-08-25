import { z } from "zod";

import { QuizAnswerValidationMessage } from "../enums/quiz-answer-validation-message.enum.js";

const quizAnswerCreate = z.object({
	isSkipped: z
		.boolean({ required_error: QuizAnswerValidationMessage.FIELD_REQUIRED })
		.optional()
		.default(false),
	questionId: z.number({
		required_error: QuizAnswerValidationMessage.FIELD_REQUIRED,
	}),
	quizId: z.number({
		required_error: QuizAnswerValidationMessage.FIELD_REQUIRED,
	}),
	userInput: z
		.string({ required_error: QuizAnswerValidationMessage.FIELD_REQUIRED })
		.default(""),
});

type QuizAnswerCreateRequestDto = z.infer<typeof quizAnswerCreate>;

export { quizAnswerCreate, type QuizAnswerCreateRequestDto };
