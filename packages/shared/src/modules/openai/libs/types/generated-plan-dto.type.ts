import { type ValueOf } from "src/libs/types/types.js";

import { type ExecutionTimeType } from "../../../tasks/tasks.js";

type GeneratedDayDTO = {
	dayNumber: number;
	tasks: GeneratedTaskDTO[];
};

type GeneratedPlanDTO = {
	days: GeneratedDayDTO[];
	duration: number;
	intensity: string;
	title: string;
};

type GeneratedTaskDTO = {
	executionTimeType: null | ValueOf<typeof ExecutionTimeType>;
	order: number;
	title: string;
};

type PlanActionTypeMap = {
	day: GeneratedDayDTO;
	plan: GeneratedPlanDTO;
	task: GeneratedTaskDTO;
};

export {
	type GeneratedDayDTO,
	type GeneratedPlanDTO,
	type GeneratedTaskDTO,
	type PlanActionTypeMap,
};
