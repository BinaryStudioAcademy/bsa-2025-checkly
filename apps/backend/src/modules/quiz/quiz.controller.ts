import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIBodyOptions,
	type APIHandlerResponse,
	BaseController,
	type IdParametersOption,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPRequestMethod } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { QuizApiPath } from "./libs/enums/enums.js";
import { type QuizCreateRequestDto } from "./libs/types/types.js";
import { quizCreateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
import { type QuizService } from "./quiz.service.js";

class QuizController extends BaseController {
	private quizService: QuizService;

	public constructor(logger: Logger, quizService: QuizService) {
		super(logger, APIPath.QUIZ);

		this.quizService = quizService;

		this.addRoute({
			handler: (options) =>
				this.create(options as APIBodyOptions<QuizCreateRequestDto>),
			method: HTTPRequestMethod.POST,
			path: QuizApiPath.ROOT,
			validation: {
				body: quizCreateValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => this.findById(options as IdParametersOption),
			method: HTTPRequestMethod.GET,
			path: QuizApiPath.$ID,
		});
	}

	private async create(
		options: APIBodyOptions<QuizCreateRequestDto>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.quizService.create(options.body),
			status: HTTPCode.OK,
		};
	}

	private async findById(
		options: IdParametersOption,
	): Promise<APIHandlerResponse> {
		const { id } = options.params;

		return {
			payload: await this.quizService.find(id),
			status: HTTPCode.OK,
		};
	}
}

export { QuizController };
