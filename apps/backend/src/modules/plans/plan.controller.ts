import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type PlanService } from "~/modules/plans/plan.service.js";
import {
	planCreateValidationSchema,
	type PlanRequestDto,
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
 *         isCustom:
 *           type: boolean
 *         parentTaskId:
 *           type: number
 *           nullable: true
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
 *         isRegenerated:
 *           type: boolean
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
 *           type: string
 *         intensity:
 *           type: string
 *         isActive:
 *           type: boolean
 *         userId:
 *           type: number
 *         parentPlanId:
 *           type: number
 *           nullable: true
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
 *           type: string
 *         intensity:
 *           type: string
 *         parentPlanId:
 *           type: number
 *           nullable: true
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
 *           type: string
 *           example: "4 weeks"
 *         intensity:
 *           type: string
 *           example: "high"
 *         isActive:
 *           type: boolean
 *           example: true
 *         userId:
 *           type: number
 *           example: 1
 *         parentPlanId:
 *           type: number
 *           nullable: true
 *           example: null
 */
class PlanController extends BaseController {
	private planService: PlanService;

	public constructor(logger: Logger, planService: PlanService) {
		super(logger, APIPath.PLANS);

		this.planService = planService;

		this.addRoute({
			handler: (options) =>
				this.findById(options as APIHandlerOptions<{ params: { id: number } }>),
			method: "GET",
			path: PlansApiPath.PLAN,
		});

		this.addRoute({
			handler: (options) =>
				this.create(
					options as APIHandlerOptions<{
						body: PlanRequestDto;
					}>,
				),
			method: "POST",
			path: PlansApiPath.PLAN_CREATE,
			validation: {
				body: planCreateValidationSchema,
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
	 */
	private async create(
		options: APIHandlerOptions<{ body: PlanRequestDto }>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.planService.create(options.body),
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
	 */
	private async findById(
		options: APIHandlerOptions<{ params: { id: number } }>,
	): Promise<APIHandlerResponse> {
		const { id } = options.params;

		return {
			payload: await this.planService.findById(id),
			status: HTTPCode.OK,
		};
	}
}

export { PlanController };
