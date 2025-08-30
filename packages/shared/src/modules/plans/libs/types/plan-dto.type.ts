import { type PlanCategoryDto } from "../../../plan-categories/plan-categories.js";
import { type ExecutionTimeTypeValue } from "../../../tasks/tasks.js";

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
	createdAt?: string;
	duration: number;
	id: number;
	intensity: string;
	quizId: null | number;
	styleId: number;
	title: string;
	updatedAt?: string;
	userId: null | number;
};

type PlanWithCategoryDto = PlanDaysTaskDto & {
	category?: PlanCategoryDto;
};

type TaskDto = {
	completedAt: null | string;
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
};
