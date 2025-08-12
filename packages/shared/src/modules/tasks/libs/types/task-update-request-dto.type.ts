import { type ValueOf } from "src/libs/types/types.js";

import { type ExecutionTimeType } from "../enums/enums.js";

type TaskUpdateRequestDto = {
	completedAt?: string;
	description?: string;
	executionTimeType?: ValueOf<typeof ExecutionTimeType>;
	isCompleted?: boolean;
	order?: number;
	title?: string;
};

export { type TaskUpdateRequestDto };
