import { type PlanCategoryDto } from "../../../plan-categories/plan-categories.js";
import { type TaskDto } from "../../../tasks/tasks.js";

type PlanDayDto = {
	dayNumber: number;
	id: number;
	tasks: TaskDto[];
};

type PlanDaysTaskDto = PlanDto & {
	days: PlanDayDto[];
};

type PlanDto = {
	categoryId: number;
	duration: number;
	id: number;
	intensity: string;
	title: string;
	userId: null | number;
};

type PlanWithCategoryDto = PlanDaysTaskDto & {
	category?: PlanCategoryDto;
};

export {
	type PlanDayDto,
	type PlanDaysTaskDto,
	type PlanDto,
	type PlanWithCategoryDto,
};
