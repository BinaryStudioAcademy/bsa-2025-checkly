const ErrorMessage = {
	DEFAULT_ERROR_MESSAGE: "Something went wrong",
	INVALID_CREDENTIALS: "Invalid credentials",
	PLAN_GENERATION_ERROR_MESSAGE: "Failed to complete plan generation",
	QUIZ_NO_ANSWERS:
		"Please answer at least one quiz question before generating a plan.",
	QUIZ_NOT_COMPLETED: "You need to complete the quiz before generating a plan.",
	QUIZ_STORAGE_CLEAR_ERROR_MESSAGE: "Failed to clear quiz state from storage",
	QUIZ_STORAGE_ERROR_MESSAGE: "Failed to save quiz state to storage",
	QUIZ_STORAGE_LOAD_ERROR_MESSAGE: "Failed to load quiz state from storage",
} as const;

export { ErrorMessage };
