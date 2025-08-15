import { logger } from "~/libs/modules/logger/logger.js";

import { PlanController } from "./plan.controller.js";
import { PlanModel } from "./plan.model.js";
import { PlanRepository } from "./plan.repository.js";
import { PlanService } from "./plan.service.js";

const planRepository = new PlanRepository(PlanModel);
const planService = new PlanService(planRepository);
const planController = new PlanController(logger, planService);

export { planController };
export {
	type PlanCreateRequestDto,
	type PlanDayDto,
	type PlanDaysTaskDto,
<<<<<<< HEAD
	type QuizAnswersRequestDto,
=======
	type PlanWithCategoryDto,
>>>>>>> 0a250930 (feat: + update plan module to add category cy-171)
} from "./libs/types/types.js";
export {
	planCreateValidationSchema,
	quizAnswersValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
