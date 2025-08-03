import { logger } from "~/libs/modules/logger/logger.js";

import { QuizContoller } from "./quiz.controller.js";

const quizContolller = new QuizContoller(logger);

export { quizContolller };
