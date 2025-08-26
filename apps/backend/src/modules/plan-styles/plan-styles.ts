import { logger } from "~/libs/modules/logger/logger.js";

import { PlanStyleController } from "./plan-style.controller.js";
import { PlanStyleModel } from "./plan-style.model.js";
import { PlanStyleRepository } from "./plan-style.repository.js";
import { PlanStyleService } from "./plan-style.service.js";

const planStyleRepository = new PlanStyleRepository(PlanStyleModel);
const planStyleService = new PlanStyleService(planStyleRepository);
const planStylesController = new PlanStyleController(logger, planStyleService);

export { planStylesController };
