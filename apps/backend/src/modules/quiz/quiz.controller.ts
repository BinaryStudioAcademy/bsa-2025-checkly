import {
	APIPath,
	HTTPCode,
	HTTPRequestMethod,
	type QuizAnswersRequestDto,
	QuizAnswersValidationSchema,
	QuizzApiPath,
} from "shared";

import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type QuizService } from "./quiz.service.js";

class QuizController extends BaseController {
	public constructor(
		logger: Logger,
		private readonly quizService: QuizService,
	) {
		super(logger, APIPath.QUIZ);

		this.quizService = quizService;

		this.addRoute({
			handler: () => this.findAllQuestions(),
			isPublic: true,
			method: HTTPRequestMethod.GET,
			path: QuizzApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) =>
				this.submitAnswers(
					options as APIHandlerOptions<{
						body: QuizAnswersRequestDto;
					}>,
				),
			isPublic: true,
			method: HTTPRequestMethod.POST,
			path: QuizzApiPath.ROOT,
			validation: {
				body: QuizAnswersValidationSchema,
			},
		});
	}

	private async findAllQuestions(): Promise<APIHandlerResponse> {
		return {
			payload: await this.quizService.findAllQuestions(),
			status: HTTPCode.OK,
		};
	}

	private submitAnswers(
		options: APIHandlerOptions<{
			body: QuizAnswersRequestDto;
		}>,
	): APIHandlerResponse {
		return {
			payload: this.quizService.submitAnswers(options.body),
			status: HTTPCode.OK,
		};
	}
}

export { QuizController };
