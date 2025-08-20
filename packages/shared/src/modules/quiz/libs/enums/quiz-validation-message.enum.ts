const QuizValidationMessage = {
	ANSWERS_REQUIRED: "Answers are required.",
	NON_SKIPPED_QUESTION:
		"At least one of the selected options or user input must be provided for a non-skipped question.",
	QUESTION_TEXT_MIN_LENGTH:
		"Question text minimum length should be at least 5 characters.",
	QUESTION_TEXT_REQUIRED: "Question text is required.",
	SKIPPED_QUESTIONS:
		"Answers list should containt at least one non-skipped question.",
} as const;

export { QuizValidationMessage };
