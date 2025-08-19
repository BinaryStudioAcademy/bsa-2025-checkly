import { logger } from "~/libs/modules/logger/logger.js";

import { PlanCategoryController } from "./plan-category.controller.js";
import { PlanCategoryModel } from "./plan-category.model.js";
import { PlanCategoryRepository } from "./plan-category.repository.js";
import { PlanCategoryService } from "./plan-category.service.js";

const planCategoryRepository = new PlanCategoryRepository(PlanCategoryModel);
const planCategoryService = new PlanCategoryService(planCategoryRepository);
const planCategoryController = new PlanCategoryController(
	logger,
	planCategoryService,
);

export { planCategoryController };
