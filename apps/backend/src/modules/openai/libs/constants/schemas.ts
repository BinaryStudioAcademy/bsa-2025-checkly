// eslint-disable-next-line quotes
const TASK_SCHEMA = `{"title": string, "description": string, "executionTimeType": "afternoon" | "evening" | "morning" | null, "order": number}`;

const DAY_SCHEMA = `{"dayNumber": number,"tasks": [${TASK_SCHEMA}]}`;

const PLAN_SCHEMA = `{"days": [${DAY_SCHEMA}],"duration": number,"intensity": string,"title": string}`;

export { PLAN_SCHEMA };
