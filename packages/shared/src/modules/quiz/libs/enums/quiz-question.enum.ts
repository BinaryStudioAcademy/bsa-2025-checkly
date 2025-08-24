const QuizQuestionFormat = {
	MULTIPLE_CHOICE: "multiple_choice",
	MULTIPLE_CHOICE_WITH_TEXT_INPUT: "multiple_choice_with_text_input",
	SINGLE_CHOICE: "single_choice",
	SINGLE_CHOICE_WITH_TEXT_INPUT: "single_choice_with_text_input",
	TEXT_INPUT: "text_input",
} as const;

const QuizQuestionFormatLabels = {
	[QuizQuestionFormat.MULTIPLE_CHOICE]: "Select all that apply",
	[QuizQuestionFormat.MULTIPLE_CHOICE_WITH_TEXT_INPUT]:
		"Select all that apply and add details if needed",
	[QuizQuestionFormat.SINGLE_CHOICE]: "Choose one option",
	[QuizQuestionFormat.SINGLE_CHOICE_WITH_TEXT_INPUT]:
		"Choose one option or add your answer",
	[QuizQuestionFormat.TEXT_INPUT]: "Enter your answer",
};

export { QuizQuestionFormat, QuizQuestionFormatLabels };
