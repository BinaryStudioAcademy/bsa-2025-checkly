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
	type PlanDayRegenerationRequestDto,
	type PlanSearchQueryParameter,
	planSearchQueryParametersValidationSchema,
	type QuizAnswersRequestDto,
	quizAnswersValidationSchema,
	type TaskRegenerationRequestDto,
} from "~/modules/plans/plans.js";

import { PlanAction, PlansApiPath } from "./libs/enums/enums.js";

/**
 * @swagger
 * tags:
 *   - name: plans
 *     description: Endpoints related to plans
 *
 * components:
 *   schemas:
 *     PlanCategoryDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Sports"
 *         iconHref:
 *           type: string
 *           example: "https://res.cloudinary.com/dezfqozcv/image/upload/v1755447659/spirituality_zae43g.png"
 *         order:
 *           type: integer
 *           example: 1
 *
 *     TaskDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         order:
 *           type: integer
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
 *           type: integer
 *         dayNumber:
 *           type: integer
 *         tasks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TaskDto'
 *
 *     PlanDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         duration:
 *           type: integer
 *         intensity:
 *           type: string
 *         userId:
 *           type: integer
 *         categoryId:
 *           type: integer
 *           description: "ID of the plan category"
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
 *     PlanWithCategoryDto:
 *       allOf:
 *         - $ref: '#/components/schemas/PlanDaysTaskDto'
 *         - type: object
 *           properties:
 *             category:
 *               $ref: '#/components/schemas/PlanCategoryDto'
 *
 *     PlanRequestDto:
 *       type: object
 *       required:
 *         - title
 *         - userId
 *         - duration
 *         - intensity
 *         - categoryId
 *       properties:
 *         title:
 *           type: string
 *         userId:
 *           type: integer
 *         duration:
 *           type: integer
 *         intensity:
 *           type: string
 *         categoryId:
 *           type: integer
 *
 *     PlanResponseDto:
 *       $ref: '#/components/schemas/PlanDto'
 *
 *     QuizAnswer:
 *       type: object
 *       required:
 *         - questionId
 *         - questionText
 *         - isSkipped
 *       properties:
 *         questionId:
 *           type: integer
 *         questionText:
 *           type: string
 *           example: "What motivates you the most?"
 *         isSkipped:
 *           type: boolean
 *         selectedOptions:
 *           type: array
 *           items:
 *             oneOf:
 *               - type: integer
 *               - type: string
 *           example: [1, "Achieving goals"]
 *         userInput:
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
			path: PlansApiPath.$ID,
		});

		this.addRoute({
			handler: (options) => this.regenerate(options as IdParametersOption),
			method: HTTPRequestMethod.PUT,
			path: PlansApiPath.REGENERATE,
		});

		this.addRoute({
			handler: (options) =>
				this.regenerateDay(
					options as APIHandlerOptions<{
						params: PlanDayRegenerationRequestDto;
					}>,
				),
			method: HTTPRequestMethod.PATCH,
			path: PlansApiPath.REGENERATE_DAY,
		});

		this.addRoute({
			handler: (options) =>
				this.regenerateTask(
					options as APIHandlerOptions<{ params: TaskRegenerationRequestDto }>,
				),
			method: HTTPRequestMethod.PATCH,
			path: PlansApiPath.REGENERATE_TASK,
		});

		this.addRoute({
			handler: (options) =>
				this.create(options as APIBodyOptions<PlanCreateRequestDto>),
			method: HTTPRequestMethod.POST,
			path: PlansApiPath.ROOT,
			validation: {
				body: planCreateValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.generate(options as APIBodyOptions<QuizAnswersRequestDto>),
			isPublic: true,
			method: HTTPRequestMethod.POST,
			path: PlansApiPath.GENERATE,
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
			handler: (options) => this.findActiveByUserId(options),
			isPublic: false,
			method: HTTPRequestMethod.GET,
			path: PlansApiPath.ACTIVE,
		});

		this.addRoute({
			handler: (options) =>
				this.searchByCategoryAndTitle(
					options as SearchQueryParametersOption<PlanSearchQueryParameter>,
				),
			method: HTTPRequestMethod.GET,
			path: PlansApiPath.SEARCH,
			validation: {
				queryString: planSearchQueryParametersValidationSchema,
			},
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
	 *       201:
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
			status: HTTPCode.CREATED,
		};
	}

	private async findActiveByUserId(
		options: APIHandlerOptions,
	): Promise<APIHandlerResponse> {
		const userId = options.user?.id;

		return {
			payload: await this.planService.findActiveByUserId(userId),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /plans:
	 *   get:
	 *     tags:
	 *       - plans
	 *     summary: Get all user plans
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: User plans retrieved successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/PlanWithCategoryDto'
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
	 *           type: integer
	 *         required: true
	 *         description: ID of the plan
	 *     responses:
	 *       200:
	 *         description: Plan retrieved successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/PlanWithCategoryDto'
	 *
	 *       404:
	 *         description: Plan not found
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 message:
	 *                   type: string
	 *                   example: "Plan not found"
	 *
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
	 *
	 *       400:
	 *         description: Invalid request data
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 message:
	 *                   type: string
	 *                   example: "At least one of the selected options or user input must be provided for a non-skipped question."
	 */
	private async generate(
		options: APIBodyOptions<QuizAnswersRequestDto>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.planService.generate(options.body, PlanAction.PLAN),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /plans/{id}/regenerate:
	 *   put:
	 *     tags:
	 *       - plans
	 *     summary: Regenerate a full plan
	 *     description: Replaces the content of the plan (days and tasks).
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: integer
	 *         required: true
	 *         description: ID of the plan to regenerate
	 *     responses:
	 *       200:
	 *         description: Plan regenerated successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/PlanDaysTaskDto'
	 *       404:
	 *         description: Plan not found
	 */
	private async regenerate(
		options: IdParametersOption,
	): Promise<APIHandlerResponse> {
		const { id } = options.params;

		return {
			payload: await this.planService.regenerate(id),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /plans/{planId}/days/{dayId}/regenerate:
	 *   patch:
	 *     tags:
	 *       - plans
	 *     summary: Regenerate tasks for a specific day in a plan
	 *     description: Regenerates (replaces) all tasks within the specified day of a plan.
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: planId
	 *         required: true
	 *         schema:
	 *           type: integer
	 *         description: The ID of the plan
	 *       - in: path
	 *         name: dayId
	 *         required: true
	 *         schema:
	 *           type: integer
	 *         description: The ID of the day to regenerate
	 *     responses:
	 *       200:
	 *         description: Successfully regenerated day tasks
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/PlanDaysTaskDto'
	 *       404:
	 *         description: Plan or day not found
	 */
	private async regenerateDay(
		options: APIHandlerOptions<{ params: PlanDayRegenerationRequestDto }>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.planService.regenerateDay(options.params),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /plans/{planId}/days/{dayId}/tasks/{taskId}/regenerate:
	 *   patch:
	 *     tags:
	 *       - plans
	 *     summary: Regenerate a specific task in a plan day
	 *     description: Regenerates (replaces) the content of a specific task within the specified day of a plan.
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: planId
	 *         required: true
	 *         schema:
	 *           type: integer
	 *         description: The ID of the plan
	 *       - in: path
	 *         name: dayId
	 *         required: true
	 *         schema:
	 *           type: integer
	 *         description: The ID of the day containing the task
	 *       - in: path
	 *         name: taskId
	 *         required: true
	 *         schema:
	 *           type: integer
	 *         description: The ID of the task to regenerate
	 *     responses:
	 *       200:
	 *         description: Successfully regenerated the task
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/PlanDaysTaskDto'
	 *       404:
	 *         description: Plan, day, or task not found
	 */
	private async regenerateTask(
		options: APIHandlerOptions<{ params: TaskRegenerationRequestDto }>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.planService.regenerateTask(options.params),
			status: HTTPCode.OK,
		};
	}
	/**
	 * @swagger
	 * /plans/search:
	 *   get:
	 *     tags:
	 *       - plans
	 *     summary: Search plans by category and title
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: query
	 *         name: categoryId
	 *         schema:
	 *           type: integer
	 *         required: false
	 *         description: Category ID required to filter by (0 or "" for all categories)
	 *         example: 2
	 *       - in: query
	 *         name: title
	 *         schema:
	 *           type: string
	 *         required: false
	 *         description: Title to search for
	 *         example: "workout"
	 *     responses:
	 *       200:
	 *         description: Plans that match search criteria retrieved successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/PlanWithCategoryDto'
	 *               with_results:
	 *                 summary: Plans found
	 *                 value: [
	 *                   {
	 *                     "id": 1,
	 *                     "title": "Morning Workout",
	 *                     "duration": 30,
	 *                     "intensity": "medium",
	 *                     "userId": 1,
	 *                     "categoryId": 2,
	 *                     "category": {
	 *                       "id": 2,
	 *                       "title": "Sports",
	 *                       "iconHref": "https://res.cloudinary.com/dezfqozcv/image/upload/v1755447659/sport_tfegpz.png",
	 *                       "order": 1
	 *                     },
	 *                     "days": []
	 *                   }
	 *                 ]
	 *               no_results:
	 *                 summary: No plans found
	 *                 value: []
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
	private async searchByCategoryAndTitle(
		options: SearchQueryParametersOption<PlanSearchQueryParameter>,
	): Promise<APIHandlerResponse> {
		const NO_CATEGORY_ID = 0;
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
