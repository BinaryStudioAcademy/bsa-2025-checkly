import { type ExecutionTimeTypeValue } from "../../../../modules/tasks/tasks.js";

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

export { type TaskDto };
