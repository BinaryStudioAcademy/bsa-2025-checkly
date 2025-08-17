import { type ValueOf } from "src/libs/types/types.js";

import { type ExecutionTimeType } from "../enums/enums.js";

type TaskUpdateRequestDto = {
	description?: string;
	executionTimeType?: ValueOf<typeof ExecutionTimeType>;
	title?: string;
};

export { type TaskUpdateRequestDto };
