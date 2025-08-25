import {
	type APIHandlerResponse,
	BaseController,
	type SearchQueryParametersOption,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import {
	APIPath,
	HTTPCode,
	HTTPRequestMethod,
	QuizApiPath,
} from "./libs/enums/enums.js";
import { questionCategoryValidationSchema } from "./quiz-question.js";
import { type QuizQuestionService } from "./quiz-question.service.js";

/**
 * @swagger
 * tags:
 *   - name: quiz-questions
 *     description: Endpoints related to quiz-questions
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
 *     QuestionCategoryDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         order:
 *           type: integer
 *           example: 1
 *         categoryId:
 *           type: integer
 *           example: 1
 *         questionId:
 *           type: integer
 *           example: 1
 *         question:
 *           $ref: "#/components/schemas/QuestionDto"
 *           description: Quesion related to category
 *
 *     QuizQuestionsResponseDto:
 *       type: object
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/QuestionCategoryDto"
 *       example:
 *         items:
 *           - id: 1
 *             order: 1
 *             categoryId: 1
 *             questionId: 2
 *             question:
 *               id: 3
 *               isOptional: false
 *               text: "What motivates you the most right now?"
 *               type: "single_choice_with_text_input"
 *               options:
 *                 - id: 1
 *                   text: "🎁 Achieving a concrete result"
 *                   order: 1
 *                 - id: 2
 *                   text: "🧭 Building new habits or disciplin"
 *                   order: 2
 *                 - id: 3
 *                   text: "🧡 Feeling better emotionally"
 *                   order: 3
 *
 */
class QuizQuestionController extends BaseController {
	public constructor(
		logger: Logger,
		private readonly quizQuestionService: QuizQuestionService,
	) {
		super(logger, APIPath.QUIZ_QUESTIONS);

		this.quizQuestionService = quizQuestionService;

		this.addRoute({
			handler: (options) =>
				this.findAllByCategoryId(
					options as SearchQueryParametersOption<{ categoryId: number }>,
				),
			isPublic: true,
			method: HTTPRequestMethod.GET,
			path: QuizApiPath.ROOT,
			validation: {
				queryString: questionCategoryValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /quiz-questions:
	 *   get:
	 *     tags:
	 *       - quiz-questions
	 *     summary: Get all questions by categoryId
	 *     responses:
	 *       200:
	 *         description: Questions retrieved successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: "#/components/schemas/QuizQuestionsResponseDto"
	 */
	private async findAllByCategoryId(
		options: SearchQueryParametersOption<{ categoryId: number }>,
	): Promise<APIHandlerResponse> {
		const { categoryId } = options.query;

		return {
			payload: await this.quizQuestionService.findAllByCategoryId(categoryId),
			status: HTTPCode.OK,
		};
	}
}

export { QuizQuestionController };
