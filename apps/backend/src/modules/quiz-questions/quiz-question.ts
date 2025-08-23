import { logger } from "~/libs/modules/logger/logger.js";

import { QuestionCategoryModel } from "./libs/models/models.js";
import { QuizQuestionController } from "./quiz-question.controller.js";
import { QuizQuestionRepository } from "./quiz-question.repository.js";
import { QuizQuestionService } from "./quiz-question.service.js";

const quizQuestionRepository = new QuizQuestionRepository(
	QuestionCategoryModel,
);
const quizQuestionService = new QuizQuestionService(quizQuestionRepository);
const quizQuestionController = new QuizQuestionController(
	logger,
	quizQuestionService,
);

export { quizQuestionController };
export { questionCategoryValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
