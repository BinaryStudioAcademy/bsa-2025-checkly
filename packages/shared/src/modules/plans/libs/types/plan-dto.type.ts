import { type ExecutionTimeTypeValue } from "../../../../modules/tasks/tasks.js";
import { type PlanCategoryDto } from "../../../plan-categories/plan-categories.js";

type PlanDayDto = {
	dayNumber: number;
	id: number;
	planId: number;
	tasks: TaskDto[];
};

type PlanDaysTaskDto = PlanDto & {
	days: PlanDayDto[];
};

type PlanDto = {
	categoryId: null | number;
	duration: number;
	id: number;
	intensity: string;
	quizId: null | number;
	title: string;
	userId: null | number;
};

type PlanWithCategoryDto = PlanDaysTaskDto & {
	category?: PlanCategoryDto;
};

type TaskDto = {
	completedAt: null | string;
	description: string;
	executionTimeType: ExecutionTimeTypeValue;
	id: number;
	isCompleted: boolean;
	order: number;
	planDayId: number;
	title: string;
};

export {
	type PlanDayDto,
	type PlanDaysTaskDto,
	type PlanDto,
	type PlanWithCategoryDto,
	type TaskDto,
};
