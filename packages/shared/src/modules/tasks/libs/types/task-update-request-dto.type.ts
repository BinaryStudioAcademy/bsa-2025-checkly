import { type ExecutionTimeTypeValue } from "./execution-time-type.type.js";

type TaskUpdateRequestDto = {
	description?: string;
	executionTimeType?: ExecutionTimeTypeValue;
	title?: string;
};

export { type TaskUpdateRequestDto };
