import {
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { APIPath, HTTPCode, HTTPRequestMethod } from "./libs/enums/enums.js";
import { type QuizService } from "./quiz.service.js";

class QuizController extends BaseController {
	public constructor(
		logger: Logger,
		private readonly quizService: QuizService,
	) {
		super(logger, APIPath.QUIZ);

		this.quizService = quizService;

		this.addRoute({
			handler: () => this.handleAnswers(),
			isPublic: true,
			method: HTTPRequestMethod.GET,
			path: "/",
		});
	}

	private async handleAnswers(): Promise<APIHandlerResponse> {
		return {
			payload: await this.quizService.handleAnswers(),
			status: HTTPCode.OK,
		};
	}
}

export { QuizController };
