import { logger } from "~/libs/modules/logger/logger.js";

import { QuestionModel } from "./libs/models/models.js";
import { QuizQuestionController } from "./quiz-question.controller.js";
import { QuizQuestionRepository } from "./quiz-question.repository.js";
import { QuizQuestionService } from "./quiz-question.service.js";

const quizQuestionRepository = new QuizQuestionRepository(QuestionModel);
const quizQuestionService = new QuizQuestionService(quizQuestionRepository);
const quizQuestionContolller = new QuizQuestionController(
	logger,
	quizQuestionService,
);

export { quizQuestionContolller };
