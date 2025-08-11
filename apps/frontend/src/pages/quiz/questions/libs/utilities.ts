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
	shouldFetchQuestions,
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
	isQuestionRequired,
	toggleOption,
} from "./validation-utilities.js";
