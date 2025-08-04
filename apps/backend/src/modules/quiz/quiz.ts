import { logger } from "~/libs/modules/logger/logger.js";

import { QuestionOptionsModel } from "./libs/models/question-options.model.js";
import { QuestionModel } from "./libs/models/questions.model.js";
import { QuizContoller } from "./quiz.controller.js";
import { QuizRepository } from "./quiz.repository.js";
import { QuizService } from "./quiz.service.js";

const quizRepository = new QuizRepository(QuestionModel, QuestionOptionsModel);
const quizService = new QuizService(quizRepository);
const quizContolller = new QuizContoller(logger, quizService);

export { quizContolller };
