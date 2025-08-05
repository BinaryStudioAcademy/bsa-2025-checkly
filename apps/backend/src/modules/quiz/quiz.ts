import { logger } from "~/libs/modules/logger/logger.js";

import { QuestionModel } from "./libs/models/question.model.js";
import { QuizController } from "./quiz.controller.js";
import { QuizRepository } from "./quiz.repository.js";
import { QuizService } from "./quiz.service.js";

const quizRepository = new QuizRepository(QuestionModel);
const quizService = new QuizService(quizRepository);
const quizContolller = new QuizController(logger, quizService);

export { quizContolller };
