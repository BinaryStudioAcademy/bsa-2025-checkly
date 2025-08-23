import { DataStatus } from "~/libs/enums/enums.js";
import { type QuizQuestionsResponseDto } from "~/modules/quiz/libs/types/types.js";

const shouldRedirectToQuiz = (
	selectedCategory: null | string,
	hasSavedState: boolean,
): boolean => {
	return !selectedCategory && !hasSavedState;
};

const canSubmitQuiz = (
	selectedCategory: null | string,
	questions: null | QuizQuestionsResponseDto,
): boolean => {
	return !!selectedCategory && !!questions;
};

const isLoading = (
	dataStatus: string,
	questions: null | QuizQuestionsResponseDto,
	selectedCategory: null | string,
): boolean => {
	return (
		dataStatus === DataStatus.PENDING || (!questions && !!selectedCategory)
	);
};

const hasError = (dataStatus: string): boolean => {
	return dataStatus === DataStatus.REJECTED;
};

export { canSubmitQuiz, hasError, isLoading, shouldRedirectToQuiz };
