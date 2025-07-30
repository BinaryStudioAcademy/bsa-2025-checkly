import { type ValueOf } from "src/libs/types/types.js";

import { type ExecutionTimeType } from "../enums/enums.js";

type TaskResponseDto = {
	completedAt: null | string;
	description: string;
	executionTimeType?: ValueOf<typeof ExecutionTimeType>;
	id: number;
	isCompleted: boolean;
	isCustom: boolean;
	order: number;
	parentTaskId: null | number;
	planDayId: number;
	title: string;
};

export { type TaskResponseDto };
