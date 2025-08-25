import { logger } from "~/libs/modules/logger/logger.js";

import { QuizController } from "./quiz-answer-options.controller.js";
import { QuizAnswerOptionModel } from "./quiz-answer-options.model.js";
import { QuizAnswerOptionRepository } from "./quiz-answer-options.repository.js";
import { QuizAnswerOptionService } from "./quiz-answer-options.service.js";

const quizAnswerOptionRepository = new QuizAnswerOptionRepository(
	QuizAnswerOptionModel,
);
const quizAnswerOptionService = new QuizAnswerOptionService(
	quizAnswerOptionRepository,
);
const quizAnswerOptionController = new QuizController(
	logger,
	quizAnswerOptionService,
);

export { quizAnswerOptionController, quizAnswerOptionRepository };
