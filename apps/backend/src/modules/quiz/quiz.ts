import { logger } from "~/libs/modules/logger/logger.js";

import { QuizController } from "./quiz.controller.js";
import { QuizService } from "./quiz.service.js";

const quizService = new QuizService();
const quizContolller = new QuizController(logger, quizService);

export { quizContolller };
