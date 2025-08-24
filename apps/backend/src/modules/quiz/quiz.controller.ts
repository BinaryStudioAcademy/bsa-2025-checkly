import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPRequestMethod } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { QuizApiPath } from "./libs/enums/enums.js";
import { type QuizService } from "./quiz.service.js";

class QuizController extends BaseController {
	private quizService: QuizService;

	public constructor(logger: Logger, quizService: QuizService) {
		super(logger, APIPath.QUIZ);

		this.quizService = quizService;

		this.addRoute({
			handler: () => this.create(),
			method: HTTPRequestMethod.POST,
			path: QuizApiPath.ROOT,
		});
	}

	private async create(): Promise<APIHandlerResponse> {
		return {
			payload: await this.quizService.create(),
			status: HTTPCode.OK,
		};
	}
}

export { QuizController };
