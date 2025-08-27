import { ExecutionTimeType } from "../enums/enums.js";

const TASK_SCHEMA = `{"title": string, "executionTimeType": "${ExecutionTimeType.AFTERNOON}" | "${ExecutionTimeType.MORNING}" | "${ExecutionTimeType.EVENING}" | null, "order": number}`;

const DAY_SCHEMA = `{"dayNumber": number,"tasks": [${TASK_SCHEMA}]}`;

const PLAN_SCHEMA = `{"days": [${DAY_SCHEMA}],"duration": number,"intensity": string,"title": string}`;

export { DAY_SCHEMA, PLAN_SCHEMA, TASK_SCHEMA };
