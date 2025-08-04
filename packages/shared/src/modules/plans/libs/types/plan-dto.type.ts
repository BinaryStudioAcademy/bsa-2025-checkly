type PlanDayDto = {
	dayNumber: number;
	id: number;
	tasks: TaskDto[];
};

type PlanDaysTaskDto = PlanDto & {
	days: PlanDayDto[];
};

type PlanDto = {
	duration: number;
	id: number;
	intensity: string;
	title: string;
	userId: number;
};

type TaskDto = {
	completedAt: null | string;
	description: string;
	executionTimeType: string;
	id: number;
	isCompleted: boolean;
	order: number;
	title: string;
};

export { type PlanDayDto, type PlanDaysTaskDto };
