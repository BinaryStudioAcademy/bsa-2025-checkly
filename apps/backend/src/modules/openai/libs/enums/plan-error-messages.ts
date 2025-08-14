const PlanErrorMessages = {
	DAYS_FAILED: "Days must not be an empty array.",
	GENERATION_FAILED: "Failed to generate plan.",
	OPENAI_FAILED:
		"An error occurred while processing your request. Please try again later.",
	PLAN_FAILED: "The plan structure is incorrect or missing required fields.",
	TASK_FAILED: "One or more required task fields are missing or invalid.",
	TASKS_FAILED:
		"Tasks should be not empty and day number must correspond to the proper day index.",
} as const;

export { PlanErrorMessages };
