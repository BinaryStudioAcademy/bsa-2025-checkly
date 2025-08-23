import { logger } from "~/libs/modules/logger/logger.js";
import { planDayRepository } from "~/modules/plan-days/plan-days.js";
import { taskRepository } from "~/modules/tasks/tasks.js";

import { planCategoryRepository } from "../plan-categories/plan-categories.js";
import { quizAnswerRepository } from "../quiz-answers/quiz-answers.js";
import { PlanController } from "./plan.controller.js";
import { PlanModel } from "./plan.model.js";
import { PlanRepository } from "./plan.repository.js";
import { PlanService } from "./plan.service.js";

const planRepository = new PlanRepository(
	PlanModel,
	planDayRepository,
	taskRepository,
);
const planService = new PlanService({
	planCategoryRepository,
	planDayRepository,
	planRepository,
	quizAnswerRepository,
	taskRepository,
});
const planController = new PlanController(logger, planService);

export { planController };
export {
	type PlanCategoryDto,
	type PlanCreateRequestDto,
	type PlanDayDto,
	type PlanDayRegenerationRequestDto,
	type PlanDaysTaskDto,
	type PlanSearchQueryParameter,
	type PlanWithCategoryDto,
	type QuizAnswersRequestDto,
	type TaskRegenerationRequestDto,
} from "./libs/types/types.js";
export {
	planCreateValidationSchema,
	planSearchQueryParametersValidationSchema,
	quizAnswersValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
