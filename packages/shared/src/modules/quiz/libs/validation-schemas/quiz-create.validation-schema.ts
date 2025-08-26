import { z } from "zod";

import { QuizValidationMessage } from "../enums/enums.js";

const quizCreate = z.object({
	categoryId: z
		.number({
			required_error: QuizValidationMessage.FIELD_REQUIRED,
		})
		.int()
		.positive(),
});

type QuizCreateRequestDto = z.infer<typeof quizCreate>;

export { quizCreate, type QuizCreateRequestDto };
