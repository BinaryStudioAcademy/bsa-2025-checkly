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
	type TaskRegenerationRequestDto,
} from "~/modules/plans/plans.js";

import { type PlanStyleUpdateRequestDto } from "../plan-styles/libs/types/types.js";
import { PlanAction, PlansApiPath } from "./libs/enums/enums.js";
import { type GeneratePlanRequestDto } from "./libs/types/types.js";
import { generatePlanValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

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
 *           example: "I want to be successful"
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
			isPublic: true,
			method: HTTPRequestMethod.GET,
			path: PlansApiPath.$ID,
		});

		this.addRoute({
			handler: (options) => this.regenerate(options as IdParametersOption),
			method: HTTPRequestMethod.POST,
			path: PlansApiPath.REGENERATE,
		});

		this.addRoute({
			handler: (options) =>
				this.findActiveByUserId(
					options as APIHandlerOptions<{ query: { userId: string } }>,
				),
			method: HTTPRequestMethod.GET,
			path: PlansApiPath.ACTIVE,
		});

		this.addRoute({
			handler: (options) =>
				this.regenerateDay(
					options as APIHandlerOptions<{
						params: PlanDayRegenerationRequestDto;
					}>,
				),
			method: HTTPRequestMethod.POST,
			path: PlansApiPath.REGENERATE_DAY,
		});

		this.addRoute({
			handler: (options) =>
				this.regenerateTask(
					options as APIHandlerOptions<{
						params: TaskRegenerationRequestDto;
					}>,
				),
			method: HTTPRequestMethod.POST,
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
				this.generate(options as APIBodyOptions<GeneratePlanRequestDto>),
			isPublic: true,
			method: HTTPRequestMethod.POST,
			path: PlansApiPath.GENERATE,
			validation: {
				body: generatePlanValidationSchema,
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
			validation: {
				queryString: planSearchQueryParametersValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.updateStyle(
					options as APIBodyOptions<PlanStyleUpdateRequestDto> &
						IdParametersOption,
				),
			method: HTTPRequestMethod.PATCH,
			path: PlansApiPath.PLAN_STYLE,
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
		options: APIHandlerOptions<{ query: { userId: string } }>,
	): Promise<APIHandlerResponse> {
		const userId = Number(options.query.userId);

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
		options: APIBodyOptions<GeneratePlanRequestDto>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.planService.generate(options.body, PlanAction.PLAN),
			status: HTTPCode.OK,
		};
	}

	private async regenerate(
		options: IdParametersOption,
	): Promise<APIHandlerResponse> {
		const { id } = options.params;

		return {
			payload: await this.planService.regenerate(id),
			status: HTTPCode.OK,
		};
	}

	private async regenerateDay(options: APIHandlerOptions<{
		params: PlanDayRegenerationRequestDto;
	}>): Promise<APIHandlerResponse> {
		const { dayId, planId } = options.params;

		return {
			payload: await this.planService.regenerateDay(planId, dayId),
			status: HTTPCode.OK,
		};
	}

	private async regenerateTask(options: {
		params: TaskRegenerationRequestDto;
	}): Promise<APIHandlerResponse> {
		const { dayId, planId, taskId } = options.params;

		return {
			payload: await this.planService.regenerateTask(planId, dayId, taskId),
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

	/**
	 * @swagger
	 * /plans/{id}/style:
	 *   patch:
	 *     tags:
	 *       - plans
	 *     summary: Update plan style
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: integer
	 *         required: true
	 *         example: 1
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             required:
	 *               - styleId
	 *             properties:
	 *               styleId:
	 *                 type: integer
	 *                 description: Style ID to assign to the plan
	 *                 example: 1
	 *     responses:
	 *       200:
	 *         description: Plan style updated successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/PlanResponseDto'
	 *       401:
	 *         description: Unauthorized - Invalid or missing authentication token
	 *       404:
	 *         description: Plan not found
	 */
	private async updateStyle(
		options: APIBodyOptions<PlanStyleUpdateRequestDto> & IdParametersOption,
	): Promise<APIHandlerResponse> {
		const { body, params } = options;
		const userId = options.user?.id;

		return {
			payload: await this.planService.updateStyle(
				userId as number,
				params.id,
				body.styleId,
			),
			status: HTTPCode.OK,
		};
	}
}

export { PlanController };
