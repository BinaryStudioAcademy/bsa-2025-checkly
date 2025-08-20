import {
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPRequestMethod } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { APIPath, PlanCategoriesApiPath } from "./libs/enums/enums.js";
import { type PlanCategoryService } from "./plan-category.service.js";

/**
 * @swagger
 * tags:
 *   - name: plan-categories
 *     description: Endpoints related to plan-categories
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
 */
class PlanCategoryController extends BaseController {
	private planCategoryService: PlanCategoryService;

	public constructor(logger: Logger, planCategoryService: PlanCategoryService) {
		super(logger, APIPath.PLAN_CATEGORIES);

		this.planCategoryService = planCategoryService;

		this.addRoute({
			handler: () => this.findAll(),
			isPublic: true,
			method: HTTPRequestMethod.GET,
			path: PlanCategoriesApiPath.ROOT,
		});
	}

	/**
	 * @swagger
	 * /plan-categories:
	 *   get:
	 *     tags:
	 *       - plan-categories
	 *     summary: Get all plan categories
	 *     responses:
	 *       200:
	 *         description: Plan categories retrieved successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/PlanCategoryDto'
	 */
	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.planCategoryService.findAll(),
			status: HTTPCode.OK,
		};
	}
}

export { PlanCategoryController };
