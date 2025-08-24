import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPRequestMethod } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type PlanStyleService } from "./plan-style.service.js";

/**
 * @swagger
 * tags:
 *   - name: plan-styles
 *     description: Endpoints related to plan styles
 *
 * components:
 *   schemas:
 *     PlanStyleDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "MINIMAL"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 */
class PlanStyleController extends BaseController {
	private planStyleService: PlanStyleService;

	public constructor(logger: Logger, planStyleService: PlanStyleService) {
		super(logger, APIPath.PLAN_STYLES);

		this.planStyleService = planStyleService;

		this.addRoute({
			handler: () => this.findAll(),
			method: HTTPRequestMethod.GET,
			path: "/",
		});
	}

	/**
	 * @swagger
	 * /plan-styles:
	 *   get:
	 *     tags:
	 *       - plan-styles
	 *     summary: Get all plan styles
	 *     description: Retrieve all available plan styles
	 *     responses:
	 *       200:
	 *         description: List of plan styles retrieved successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/PlanStyleDto'
	 *       401:
	 *         description: Unauthorized
	 *       500:
	 *         description: Internal server error
	 */
	private async findAll(): Promise<APIHandlerResponse> {
		const planStyles = await this.planStyleService.findAll();

		return {
			payload: planStyles.map((planStyle) => planStyle.toObject()),
			status: HTTPCode.OK,
		};
	}
}

export { PlanStyleController };
