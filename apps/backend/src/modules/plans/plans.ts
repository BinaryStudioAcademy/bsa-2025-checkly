import { logger } from "~/libs/modules/logger/logger.js";
import { planDayRepository } from "~/modules/plan-days/plan-days.js";
import { taskRepository } from "~/modules/tasks/tasks.js";

import { PlanController } from "./plan.controller.js";
import { PlanModel } from "./plan.model.js";
import { PlanRepository } from "./plan.repository.js";
import { PlanService } from "./plan.service.js";

const planRepository = new PlanRepository(
	PlanModel,
	planDayRepository,
	taskRepository,
);
const planService = new PlanService(
	planRepository,
	planDayRepository,
	taskRepository,
);
const planController = new PlanController(logger, planService);

export { planController };
export {
	type PlanCreateRequestDto,
	type PlanDayDto,
	type PlanDayRegenerateRequestDto,
	type PlanDaysTaskDto,
	type PlanSearchQueryParameter,
	type PlanWithCategoryDto,
	type TaskRegenerateRequestDto,
} from "./libs/types/types.js";
export {
	planCreateValidationSchema,
	planSearchQueryParametersValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
