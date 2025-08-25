import { logger } from "~/libs/modules/logger/logger.js";

import { QuizAnswerController } from "./quiz-answer.controller.js";
import { QuizAnswerModel } from "./quiz-answer.model.js";
import { QuizAnswerRepository } from "./quiz-answer.repository.js";
import { QuizAnswerService } from "./quiz-answer.service.js";

const quizAnswerRepository = new QuizAnswerRepository(QuizAnswerModel);
const quizAnswerService = new QuizAnswerService(quizAnswerRepository);
const quizAnswerController = new QuizAnswerController(
	logger,
	quizAnswerService,
);

export { quizAnswerController, quizAnswerRepository };
export { type QuizAnswerCreateRequestDto } from "./libs/types/types.js";
export { quizAnswerCreateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
