import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIBodyOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPRequestMethod } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { QuizAnswerOptionApiPath } from "./libs/enums/enums.js";
import { type QuizAnswerOptionCreateRequestDto } from "./libs/types/types.js";
import { quizAnswerOptionValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
import { type QuizAnswerOptionService } from "./quiz-answer-options.service.js";

class QuizController extends BaseController {
	private quizAnswerOptionService: QuizAnswerOptionService;

	public constructor(
		logger: Logger,
		quizAnswerOptionService: QuizAnswerOptionService,
	) {
		super(logger, APIPath.QUIZ_ANSWER_OPTIONS);

		this.quizAnswerOptionService = quizAnswerOptionService;

		this.addRoute({
			handler: (options) =>
				this.create(
					options as APIBodyOptions<QuizAnswerOptionCreateRequestDto>,
				),
			method: HTTPRequestMethod.POST,
			path: QuizAnswerOptionApiPath.ROOT,
			validation: {
				body: quizAnswerOptionValidationSchema,
			},
		});
	}

	private async create(
		options: APIBodyOptions<QuizAnswerOptionCreateRequestDto>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.quizAnswerOptionService.create(options.body),
			status: HTTPCode.CREATED,
		};
	}
}

export { QuizController };
