import { ExecutionTimeType } from "../types/types.js";

const TASK_SCHEMA = `{"title": string, "executionTimeType": "${ExecutionTimeType.AFTERNOON}" | "${ExecutionTimeType.MORNING}" | "${ExecutionTimeType.EVENING}" | null, "order": number}`;

const DAY_SCHEMA = `{"dayNumber": number,"tasks": [${TASK_SCHEMA}]}`;

const PLAN_SCHEMA = `{"days": [${DAY_SCHEMA}],"duration": number,"intensity": string,"title": string}`;

export { PLAN_SCHEMA };
