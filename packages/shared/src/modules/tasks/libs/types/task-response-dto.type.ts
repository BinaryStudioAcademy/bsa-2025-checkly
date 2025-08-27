import { type ExecutionTimeTypeValue } from "./execution-time-type.type.js";

type TaskResponseDto = {
	completedAt: null | string;
	description: string;
	executionTimeType?: ExecutionTimeTypeValue;
	id: number;
	isCompleted: boolean;
	order: number;
	planDayId: number;
	title: string;
};

export { type TaskResponseDto };
