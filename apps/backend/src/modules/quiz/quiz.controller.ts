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
import { quizAnswersValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
import { type QuizService } from "./quiz.service.js";

/**
 * @swagger
 * tags:
 *   - name: quiz
 *     description: Endpoints related to quiz functionality
 *
 * components:
 *   schemas:
 *     QuizAnswer:
 *       type: object
 *       required:
 *         - questionId
 *         - isSkipped
 *       properties:
 *         isSkipped:
 *           type: boolean
 *           example: false
 *         questionId:
 *           type: integer
 *           example: 1
 *         questionText:
 *           type: string
 *           example: "What motivates you the most right now?"
 *         selectedOptions:
 *           type: array
 *           items:
 *             oneOf:
 *               - type: string
 *               - type: integer
 *           example: [1, "🎁 Achieving a concrete result"]
 *         userInput:
 *           type: string
 *           example: "Want to be a champ!"
 *
 *     QuizAnswersRequestDto:
 *       type: object
 *       required:
 *         - answers
 *         - category
 *         - notes
 *       properties:
 *         answers:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/QuizAnswer"
 *         category:
 *           type: string
 *           enum:
 *             - "creativity"
 *             - "hobby"
 *             - "money"
 *             - "personal_development"
 *             - "spirituality"
 *             - "sport"
 *           example: "sport"
 *         notes:
 *           type: string
 *           example: "Some additional notes"
 *           description: Additional user notes
 *
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Morning workout"
 *         description:
 *           type: string
 *           example: "30 minutes cardio session"
 *         duration:
 *           type: integer
 *           example: 30
 *           description: Duration in minutes
 *         completed:
 *           type: boolean
 *           example: false
 *
 *     Day:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         dayNumber:
 *           type: integer
 *           example: 1
 *         date:
 *           type: string
 *           format: date
 *           example: "2024-01-01"
 *         tasks:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Task"
 *
 *     PlanMeta:
 *       type: object
 *       properties:
 *         prompt:
 *           type: string
 *           example: "Generated prompt based on user answers"
 *
 *     PlanResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "30-Day Fitness Challenge"
 *         duration:
 *           type: integer
 *           example: 30
 *         intensity:
 *           type: string
 *           example: "medium"
 *           enum: ["low", "medium", "high"]
 *         userId:
 *           type: integer
 *           example: 1
 *         days:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Day"
 *         meta:
 *           $ref: "#/components/schemas/PlanMeta"
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         errorType:
 *           type: string
 *           example: "VALIDATION"
 *         message:
 *           type: string
 *           example: "Validation failed."
 */
class QuizController extends BaseController {
	public constructor(
		logger: Logger,
		private readonly quizService: QuizService,
	) {
		super(logger, APIPath.QUIZ);

		this.quizService = quizService;

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
				body: quizAnswersValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /quiz:
	 *   post:
	 *     tags:
	 *       - quiz
	 *     summary: Generate plan based on answers
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/QuizAnswersRequestDto'
	 *           example:
	 *             answers:
	 *               - questionId: 1
	 *                 questionText: "What motivates you the most?"
	 *                 isSkipped: false
	 *                 selectedOptions: [1, "Achieving goals"]
	 *                 userInput: "I want to be successful"
	 *               - questionId: 2
	 *                 questionText: "How much time can you dedicate daily?"
	 *                 isSkipped: false
	 *                 selectedOptions: ["30 minutes"]
	 *                 userInput: ""
	 *             category: "sport"
	 *             notes: "Looking for a beginner plan"
	 *     responses:
	 *       200:
	 *         description: Plan generated successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/PlanResponseDto'
	 *       400:
	 *         description: Invalid request data
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/ErrorResponse'
	 *             example:
	 *               errorType: "VALIDATION"
	 *               message: "At least one of the selected options or user input must be provided for a non-skipped question."
	 */
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
