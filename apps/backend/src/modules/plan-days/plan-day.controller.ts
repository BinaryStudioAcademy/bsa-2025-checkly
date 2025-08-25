import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIBodyOptions,
	type APIHandlerResponse,
	BaseController,
	type IdParametersOption,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPRequestMethod } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type PlanDayService } from "~/modules/plan-days/plan-day.service.js";
import {
	type PlanDayCreateRequestDto,
	planDayCreateValidationSchema,
} from "~/modules/plan-days/plan-days.js";

import { PlanDaysApiPath } from "./libs/enums/enums.js";

/**
 * @swagger
 * tags:
 *   - name: plan-days
 *     description: Endpoints related to plan days
 *
 * components:
 *   schemas:
 *     PlanDayCreateRequestDto:
 *       type: object
 *       required:
 *         - dayNumber
 *         - planId
 *       properties:
 *         dayNumber:
 *           type: number
 *           example: 1
 *         planId:
 *           type: number
 *           example: 2
 *
 *     PlanDayResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 3
 *         dayNumber:
 *           type: number
 *           example: 1
 *         planId:
 *           type: number
 *           example: 2
 */
class PlanDayController extends BaseController {
	private planDayService: PlanDayService;

	public constructor(logger: Logger, planDayService: PlanDayService) {
		super(logger, APIPath.PLAN_DAYS);

		this.planDayService = planDayService;

		this.addRoute({
			handler: (options) => this.findById(options as IdParametersOption),
			method: HTTPRequestMethod.GET,
			path: PlanDaysApiPath.$ID,
		});

		this.addRoute({
			handler: (options) =>
				this.create(options as APIBodyOptions<PlanDayCreateRequestDto>),
			method: HTTPRequestMethod.POST,
			path: PlanDaysApiPath.ROOT,
			validation: {
				body: planDayCreateValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /plan-days/create:
	 *   post:
	 *     tags:
	 *       - plan-days
	 *     summary: Create a new plan day
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/PlanDayCreateRequestDto'
	 *     responses:
	 *       200:
	 *         description: Plan day created successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/PlanDayResponseDto'
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
		options: APIBodyOptions<PlanDayCreateRequestDto>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.planDayService.create(options.body),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /plan-days/{id}:
	 *   get:
	 *     tags:
	 *       - plan-days
	 *     summary: Get plan day by ID
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: number
	 *         required: true
	 *         description: ID of the plan day
	 *     responses:
	 *       200:
	 *         description: Plan day retrieved successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/PlanDayResponseDto'
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
	private async findById(
		options: IdParametersOption,
	): Promise<APIHandlerResponse> {
		const { id } = options.params;

		return {
			payload: await this.planDayService.find(id),
			status: HTTPCode.OK,
		};
	}
}

export { PlanDayController };
