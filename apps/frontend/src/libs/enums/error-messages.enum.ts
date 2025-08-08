const ErrorMessage = {
	DEFAULT_ERROR_MESSAGE: "Something went wrong",
	INVALID_CREDENTIALS: "Invalid credentials",
	QUIZ_STORAGE_CLEAR_ERROR_MESSAGE: "Failed to clear quiz state from storage",
	QUIZ_STORAGE_ERROR_MESSAGE: "Failed to save quiz state to storage",
	QUIZ_STORAGE_LOAD_ERROR_MESSAGE: "Failed to load quiz state from storage",
} as const;

export { ErrorMessage };
