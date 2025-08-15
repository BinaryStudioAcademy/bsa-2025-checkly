import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIBodyOptions,
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
	type IdParametersOption,
	type SearchQueryParametersOption,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPRequestMethod } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type PlanService } from "~/modules/plans/plan.service.js";
import {
	type PlanCreateRequestDto,
	planCreateValidationSchema,
	type QuizAnswersRequestDto,
	quizAnswersValidationSchema,
} from "~/modules/plans/plans.js";

import { PlansApiPath } from "./libs/enums/enums.js";
/**
 * @swagger
 * tags:
 *   - name: plans
 *     description: Endpoints related to plans
 *
 * components:
 *   schemas:
 *     TaskDto:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         order:
 *           type: number
 *         isCompleted:
 *           type: boolean
 *         executionTimeType:
 *           type: string
 *         completedAt:
 *           type: string
 *           nullable: true
 *
 *     PlanDayDto:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         dayNumber:
 *           type: number
 *         tasks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TaskDto'
 *
 *     PlanDto:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         title:
 *           type: string
 *         duration:
 *           type: number
 *         intensity:
 *           type: string
 *         userId:
 *           type: number
 *
 *     PlanDaysTaskDto:
 *       allOf:
 *         - $ref: '#/components/schemas/PlanDto'
 *         - type: object
 *           properties:
 *             days:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlanDayDto'
 *
 *     GeneratedTaskDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         order:
 *           type: number
 *         executionTimeType:
 *           type: string
 *
 *     GeneratedPlanDayDto:
 *       type: object
 *       properties:
 *         dayNumber:
 *           type: number
 *         tasks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/GeneratedTaskDto'
 *
 *     GeneratedPlanDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         duration:
 *           type: number
 *         intensity:
 *           type: string
 *
 *     GeneratedPlanDaysTaskDto:
 *       allOf:
 *         - $ref: '#/components/schemas/GeneratedPlanDto'
 *         - type: object
 *           properties:
 *             days:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GeneratedPlanDayDto'
 *
 *     PlanRequestDto:
 *       type: object
 *       required:
 *         - title
 *         - userId
 *         - duration
 *         - intensity
 *       properties:
 *         title:
 *           type: string
 *         userId:
 *           type: number
 *         duration:
 *           type: number
 *         intensity:
 *           type: string
 *
 *     PlanResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         title:
 *           type: string
 *           example: "Weight Loss Plan"
 *         duration:
 *           type: number
 *           example: 5
 *         intensity:
 *           type: string
 *           example: "high"
 *         userId:
 *           type: number
 *           example: 1
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
 */
class PlanController extends BaseController {
	private planService: PlanService;

	public constructor(logger: Logger, planService: PlanService) {
		super(logger, APIPath.PLANS);

		this.planService = planService;

		this.addRoute({
			handler: (options) =>
				this.findWithRelations(options as IdParametersOption),
			method: HTTPRequestMethod.GET,
			path: PlansApiPath.PLAN,
		});

		this.addRoute({
			handler: (options) =>
				this.create(options as APIBodyOptions<PlanCreateRequestDto>),
			method: HTTPRequestMethod.POST,
			path: PlansApiPath.PLAN_CREATE,
			validation: {
				body: planCreateValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.generate(options as APIBodyOptions<QuizAnswersRequestDto>),
			isPublic: true,
			method: HTTPRequestMethod.POST,
			path: PlansApiPath.PLAN_GENERATE,
			validation: {
				body: quizAnswersValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => this.findAllUserPlans(options),
			method: HTTPRequestMethod.GET,
			path: PlansApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) =>
				this.searchByCategoryAndTitle(
					options as SearchQueryParametersOption<PlanSearchQueryParameter>,
				),
			method: HTTPRequestMethod.GET,
			path: PlansApiPath.SEARCH,
		});
	}

	/**
	 * @swagger
	 * /plans/create:
	 *   post:
	 *     tags:
	 *       - plans
	 *     summary: Create a new plan
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/PlanRequestDto'
	 *     responses:
	 *       200:
	 *         description: Plan created successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/PlanResponseDto'
	 *       401:
	 *         description: Unauthorized - Invalid or missing authentication token
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 message:
	 *                   type: string
	 *                   example: "Unauthorized"
	 */
	private async create(
		options: APIBodyOptions<PlanCreateRequestDto>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.planService.create(options.body),
			status: HTTPCode.OK,
		};
	}

	private async findAllUserPlans(
		options: APIHandlerOptions,
	): Promise<APIHandlerResponse> {
		const userId = options.user?.id;

		return {
			payload: await this.planService.findAllUserPlans(userId as number),
			status: HTTPCode.OK,
		};
	}
	/**
	 * @swagger
	 * /plans/{id}:
	 *   get:
	 *     tags:
	 *       - plans
	 *     summary: Get plan by ID
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: number
	 *         required: true
	 *         description: ID of the plan
	 *     responses:
	 *       200:
	 *         description: Plan retrieved successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/PlanDaysTaskDto'
	 *       401:
	 *         description: Unauthorized - Invalid or missing authentication token
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 message:
	 *                   type: string
	 *                   example: "Unauthorized"
	 */
	private async findWithRelations(
		options: IdParametersOption,
	): Promise<APIHandlerResponse> {
		const { id } = options.params;

		return {
			payload: await this.planService.findWithRelations(id),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /plans/generate:
	 *   post:
	 *     tags:
	 *       - plans
	 *     summary: Generate a new plan
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
	 *               $ref: '#/components/schemas/GeneratedPlanDaysTaskDto'
	 *       400:
	 *         description: Invalid request data
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 errorType:
	 *                   type: string
	 *                   example: "VALIDATION"
	 *                 message:
	 *                   type: string
	 *                   example: "At least one of the selected options or user input must be provided for a non-skipped question."
	 */

	private async generate(
		options: APIBodyOptions<QuizAnswersRequestDto>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.planService.generate(options.body),
			status: HTTPCode.OK,
		};
	}

	private async searchByCategoryAndTitle(
		options: SearchQueryParametersOption,
	): Promise<APIHandlerResponse> {
		const NO_CATEGORY_ID = -1;
		const userId = options.user?.id;
		const { categoryId = NO_CATEGORY_ID, title = "" } = options.query;
		const query = {
			categoryId,
			title,
		};

		return {
			payload: await this.planService.search(userId as number, query),
			status: HTTPCode.OK,
		};
	}
}

export { PlanController };
