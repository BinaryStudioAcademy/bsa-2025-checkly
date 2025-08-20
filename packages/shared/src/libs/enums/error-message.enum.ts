const ErrorMessage = {
	ANSWERS_NOT_FOUND: "Answers does not exist",
	AUTHENTICATION_FAILED: "Authentication failed.",
	AUTHORIZATION_HEADER_MISSING: "Authorization header is missing or invalid.",
	PLAN_DAY_NOT_FOUND: "Plan day does not exist",
	PLAN_DAY_REGENERATION_FAILED: "Failed to regenerate plan day",
	PLAN_NOT_FOUND: "Plan does not exist",
	PLAN_REGENERATION_FAILED: "Failed to regenerate plan",
	TASK_NOT_FOUND: "Task does not exist",
	TASK_REGENERATION_FAILED: "Failed to regenerate task",
	UNAUTHORIZED_ACCESS: "Unauthorized access",
	USER_NOT_FOUND: "User not found.",
} as const;

export { ErrorMessage };
