export {
	getCurrentAnswer,
	getCurrentQuestionData,
	getTextAnswerValue,
	getTotalSteps,
	hasNoQuestions,
	isCurrentQuestion,
	isNotesPage,
	isQuestionCompleted,
	isQuestionNotFound,
} from "./data-utilities.js";
export {
	canSubmitQuiz,
	hasError,
	isLoading,
	shouldRedirectToQuiz,
} from "./initialization-utilities.js";
export {
	canGoBack,
	getNextButtonLabel,
	isFirstQuestion,
	shouldMoveToNext,
	shouldShowSkip,
} from "./navigation-utilities.js";
export {
	isNextDisabled,
	isOptionSelected,
	isOtherOption,
	toggleOption,
} from "./validation-utilities.js";
