import { logger } from "~/libs/modules/logger/logger.js";
import { taskRepository } from "~/modules/tasks/tasks.js";

import { PlanDayController } from "./plan-day.controller.js";
import { PlanDayModel } from "./plan-day.model.js";
import { PlanDayRepository } from "./plan-day.repository.js";
import { PlanDayService } from "./plan-day.service.js";

const planDayRepository = new PlanDayRepository(PlanDayModel, taskRepository);
const planDayService = new PlanDayService(planDayRepository);
const planDayController = new PlanDayController(logger, planDayService);

export { planDayController, planDayRepository, planDayService };
export { type PlanDayCreateRequestDto } from "./libs/types/types.js";
export { planDayCreateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
