import { type ValueOf } from "src/libs/types/types.js";

import { type ExecutionTimeType } from "../enums/enums.js";

type TaskResponseDto = {
	completedAt: null | string;
	description: string;
	executionTimeType?: null | ValueOf<typeof ExecutionTimeType>;
	id: number;
	isCompleted: boolean;
	order: number;
	planDayId: number;
	title: string;
};

export { type TaskResponseDto };
