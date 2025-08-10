import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import {
	APIPath,
	HTTPCode,
	HTTPRequestMethod,
	QuizzApiPath,
} from "./libs/enums/enums.js";
import { type QuizAnswersRequestDto } from "./libs/types/types.js";
import { QuizAnswersValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
import { type QuizService } from "./quiz.service.js";

/**
 * @swagger
 * tags:
 *   - name: quiz
 *     description: Endpoints related to quiz
 *
 * components:
 *   schemas:
 *     QuestionOptionDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         order:
 *           type: integer
 *           example: 1
 *         text:
 *           type: string
 *           example: "🎁 Achieving a concrete result"
 *
 *     QuestionDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         isOptional:
 *           type: boolean
 *           example: false
 *         options:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/QuestionOptionDto"
 *           description: Answer options related to question
 *         order:
 *           type: integer
 *           example: 1
 *         text:
 *           type: string
 *           example: "What motivates you the most right now?"
 *         type:
 *           type: string
 *           enum:
 *             - "multiple_choice"
 *             - "multiple_choice_with_text_input"
 *             - "single_choice"
 *             - "single_choice_with_text_input"
 *             - "text_input"
 *           example: "single_choice"
 *
 *     QuizQuestionsResponseDto:
 *       type: object
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/QuestionDto"
 *       example:
 *         items:
 *           - id: 1
 *             text: "What motivates you the most right now?"
 *             type: "single_choice_with_text_input"
 *             isOptional: false
 *             order: 1
 *             options:
 *               - id: 1
 *                 text: "🎁 Achieving a concrete result"
 *                 order: 1
 *               - id: 2
 *                 text: "🧭 Building new habits or discipline"
 *                 order: 2
 *               - id: 3
 *                 text: "🧡 Feeling better emotionally"
 *                 order: 3
 *               - id: 4
 *                 text: "✍️ Other"
 *                 order: 4
 */
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
				this.handleAnswers(
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

	/**
	 * @swagger
	 * /quiz:
	 *   get:
	 *     tags:
	 *       - quiz
	 *     summary: Get all quiz questions
	 *     responses:
	 *       200:
	 *         description: Questions retrieved successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/QuizQuestionsResponseDto'
	 */
	private async findAllQuestions(): Promise<APIHandlerResponse> {
		return {
			payload: await this.quizService.findAllQuestions(),
			status: HTTPCode.OK,
		};
	}

	private handleAnswers(
		options: APIHandlerOptions<{
			body: QuizAnswersRequestDto;
		}>,
	): APIHandlerResponse {
		return {
			payload: this.quizService.handleAnswers(options.body),
			status: HTTPCode.OK,
		};
	}
}

export { QuizController };
