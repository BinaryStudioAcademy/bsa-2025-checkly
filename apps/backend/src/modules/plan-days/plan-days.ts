import { logger } from "~/libs/modules/logger/logger.js";

import { PlanDayController } from "./plan-day.controller.js";
import { PlanDayModel } from "./plan-day.model.js";
import { PlanDayRepository } from "./plan-day.repository.js";
import { PlanDayService } from "./plan-day.service.js";

const planDayRepository = new PlanDayRepository(PlanDayModel);
const planDayService = new PlanDayService(planDayRepository);
const planDayController = new PlanDayController(logger, planDayService);

export { planDayController };
export { type PlanDayRequestDto } from "./libs/types/types.js";
export { planDayCreateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
