type PlanDayDto = {
	dayNumber: number;
	id: number;
	isRegenerated: boolean;
	tasks: TaskDto[];
};

type PlanDaysTaskDto = PlanDto & {
	days: PlanDayDto[];
};

type PlanDto = {
	duration: string;
	id: number;
	intensity: string;
	isActive: boolean;
	parentPlanId: null | number;
	title: string;
	userId: number;
};

type TaskDto = {
	completedAt: null | string;
	description: string;
	executionTimeType: string;
	id: number;
	isCompleted: boolean;
	isCustom: boolean;
	order: number;
	parentTaskId: null | number;
	title: string;
};

export { type PlanDayDto, type PlanDaysTaskDto };
