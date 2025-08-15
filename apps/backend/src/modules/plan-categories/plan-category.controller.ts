import {
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPRequestMethod } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { APIPath, PlanCategoriesApiPath } from "./libs/enums/enums.js";
import { type PlanCategoryService } from "./plan-category.service.js";

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

	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.planCategoryService.findAll(),
			status: HTTPCode.OK,
		};
	}
}

export { PlanCategoryController };
