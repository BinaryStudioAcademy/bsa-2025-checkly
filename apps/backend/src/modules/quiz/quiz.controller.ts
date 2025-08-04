import { APIPath, HTTPCode, QuizzApiPath } from "shared";
import { HTTPMethod } from "shared/src/libs/modules/http/libs/enums/http-method.enum.js";

import {
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type QuizService } from "./quiz.service.js";

class QuizContoller extends BaseController {
	private quizService: QuizService;

	public constructor(logger: Logger, quizService: QuizService) {
		super(logger, APIPath.QUIZ);

		this.quizService = quizService;

		this.addRoute({
			handler: () => this.getAllQuestionsWithOptions(),
			isPublic: true,
			method: HTTPMethod.GET,
			path: QuizzApiPath.ROOT,
		});
	}

	private async getAllQuestionsWithOptions(): Promise<APIHandlerResponse> {
		return {
			payload: await this.quizService.findAllQuestionOptions(),
			status: HTTPCode.OK,
		};
	}
}

export { QuizContoller };
