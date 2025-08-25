import { logger } from "~/libs/modules/logger/logger.js";

import { QuizController } from "./quiz.controller.js";
import { QuizModel } from "./quiz.model.js";
import { QuizRepository } from "./quiz.repository.js";
import { QuizService } from "./quiz.service.js";

const quizRepository = new QuizRepository(QuizModel);
const quizService = new QuizService(quizRepository);
const quizController = new QuizController(logger, quizService);

export { quizController };
