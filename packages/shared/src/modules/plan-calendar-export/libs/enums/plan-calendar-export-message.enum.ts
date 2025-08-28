import { PlanCalendarExportConst } from "./plan-calendar-export-const.enum.js";

const PlanCalendarExportMessage = {
	DAY_DUPLICATED: "Day {day} is duplicated.",
	DAY_INVALID: "Day must be between 1 and {duration}.",
	DAYS_LENGTH_INVALID: `Each day must have exactly ${String(PlanCalendarExportConst.TASKS_IN_DAY)} tasks.`,
	DAYS_UNIQUE_INVALID:
		"Days must contain exactly {duration} items with unique day numbers 1..{duration}.",
	PLAN_ID_REQUIRED: "Plan ID is required.",
	START_DATE_INVALID: "Start date must be a valid date in YYYY-MM-DD format.",
	START_DATE_INVALID_FORMAT: "Start date must be in format YYYY-MM-DD.",
	TASK_TITLE_REQUIRED: "Task title cannot be empty.",
} as const;

export { PlanCalendarExportMessage };
