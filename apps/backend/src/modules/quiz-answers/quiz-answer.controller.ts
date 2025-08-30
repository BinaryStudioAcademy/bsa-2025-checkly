import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIBodyOptions,
	type APIHandlerResponse,
	BaseController,
	type IdParametersOption,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPRequestMethod } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type QuizAnswerService } from "~/modules/quiz-answers/quiz-answer.service.js";
import {
	type QuizAnswerCreateRequestDto,
	quizAnswerCreateValidationSchema,
} from "~/modules/quiz-answers/quiz-answers.js";

import { QuizAnswerApiPath } from "./libs/enums/enums.js";
import { type QuizAnswerOptionsRequestDto } from "./libs/types/types.js";

class QuizAnswerController extends BaseController {
	private quizAnswerService: QuizAnswerService;

	public constructor(logger: Logger, quizAnswerService: QuizAnswerService) {
		super(logger, APIPath.QUIZ_ANSWERS);

		this.quizAnswerService = quizAnswerService;

		this.addRoute({
			handler: (options) => this.findById(options as IdParametersOption),
			method: HTTPRequestMethod.GET,
			path: QuizAnswerApiPath.$ID,
		});

		this.addRoute({
			handler: (options) =>
				this.createAnswerWithOptions(
					options as APIBodyOptions<QuizAnswerOptionsRequestDto>,
				),
			isPublic: true,
			method: HTTPRequestMethod.POST,
			path: QuizAnswerApiPath.ANSWER_OTPIONS,
		});

		this.addRoute({
			handler: (options) =>
				this.create(options as APIBodyOptions<QuizAnswerCreateRequestDto>),
			method: HTTPRequestMethod.POST,
			path: QuizAnswerApiPath.ROOT,
			validation: {
				body: quizAnswerCreateValidationSchema,
			},
		});
	}

	private async create(
		options: APIBodyOptions<QuizAnswerCreateRequestDto>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.quizAnswerService.create(options.body),
			status: HTTPCode.OK,
		};
	}

	private async createAnswerWithOptions(
		options: APIBodyOptions<QuizAnswerOptionsRequestDto>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.quizAnswerService.createAnswerWithOptions(
				options.body,
			),
			status: HTTPCode.OK,
		};
	}

	private async findById(
		options: IdParametersOption,
	): Promise<APIHandlerResponse> {
		const { id } = options.params;

		return {
			payload: await this.quizAnswerService.find(id),
			status: HTTPCode.OK,
		};
	}
}

export { QuizAnswerController };
