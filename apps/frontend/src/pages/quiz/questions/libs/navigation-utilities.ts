import { ButtonLabels, QuizIndexes } from "~/libs/enums/enums.js";
import { type QuizQuestionsResponseDto } from "~/modules/quiz/libs/types/types.js";

const isFirstQuestion = (currentQuestion: number): boolean => {
	return currentQuestion === QuizIndexes.FIRST_INDEX;
};

const isLastQuestion = (currentQuestion: number, totalQuestions: number): boolean => {
	return currentQuestion === totalQuestions;
};

const shouldShowSkip = (currentQuestion: number, totalQuestions: number, isQuestionRequired: boolean): boolean => {
	return !isLastQuestion(currentQuestion, totalQuestions) && !isQuestionRequired;
};

const getNextButtonLabel = (currentQuestion: number, totalQuestions: number): string => {
	return isLastQuestion(currentQuestion, totalQuestions) ? ButtonLabels.SUBMIT : ButtonLabels.NEXT;
};

const shouldMoveToNext = (
	questions: null | QuizQuestionsResponseDto,
	currentQuestion: number
): boolean => {
	if (!questions) {
		return false;
	}

	const hasMore = hasMoreQuestions(questions, currentQuestion);
	const isLast = isLastQuestion(currentQuestion, questions.items.length);

	return hasMore || isLast;
};

const canGoBack = (currentQuestion: number): boolean => {
	return currentQuestion > QuizIndexes.ZERO_INDEX;
};

const hasMoreQuestions = (questions: null | QuizQuestionsResponseDto, currentQuestion: number): boolean => {
	return !!questions && currentQuestion < questions.items.length;
};

export {
	canGoBack,
	getNextButtonLabel,
	hasMoreQuestions,
	isFirstQuestion,
	isLastQuestion,
	shouldMoveToNext,
	shouldShowSkip,
};
