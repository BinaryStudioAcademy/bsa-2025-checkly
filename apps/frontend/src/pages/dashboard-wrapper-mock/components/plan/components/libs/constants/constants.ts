const DEFAULT_TASK_AMOUNT = 5;
const DEFAULT_DAY_AMOUNT = 5;

const MODAL_MESSAGES = {
	DAY_REGENERATION:
		"You sure you want to regenerate the whole day? This will replace all tasks for this day with new ones while keeping other days unchanged. This action cannot be undone.",
	PLAN_REGENERATION:
		"You sure you want to regenerate the whole plan? This will replace all your current tasks and progress with new ones. This action cannot be undone.",
	TASK_DELETION:
		"You sure you want to permanently delete this task? This action cannot be undone and the task will be removed from your plan.",
	TASK_REGENERATION:
		"You sure you want to regenerate this task? This will replace the current task with a new one while keeping all other tasks unchanged. This action cannot be undone.",
} as const;

export { DEFAULT_DAY_AMOUNT, DEFAULT_TASK_AMOUNT, MODAL_MESSAGES };
