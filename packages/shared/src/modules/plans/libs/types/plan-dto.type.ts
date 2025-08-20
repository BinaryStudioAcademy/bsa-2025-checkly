import { type ExecutionTimeTypeValue } from "../../../../modules/tasks/tasks.js";

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
	duration: number;
	id: number;
	intensity: string;
	quizId: number;
	title: string;
	userId: number;
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

export { type PlanDayDto, type PlanDaysTaskDto, type PlanDto, type TaskDto };
