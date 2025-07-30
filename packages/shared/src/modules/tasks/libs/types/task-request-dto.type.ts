import { type ValueOf } from "src/libs/types/types.js";

import { type ExecutionTimeType } from "../enums/enums.js";

type TaskRequestDto = {
	description: string;
	executionTimeType?: ValueOf<typeof ExecutionTimeType>;
	isCompleted?: boolean;
	isCustom?: boolean;
	order: number;
	parentTaskId?: null | number;
	planDayId: number;
	title: string;
};

export { type TaskRequestDto };
