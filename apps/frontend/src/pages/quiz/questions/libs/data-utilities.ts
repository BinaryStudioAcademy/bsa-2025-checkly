import { QuizIndexes } from "~/libs/enums/enums.js";
import {
	type QuestionDto,
	type QuizAnswer,
	type QuizQuestionsResponseDto,
} from "~/modules/quiz/libs/types/types.js";

const getTextAnswerValue = (currentAnswer: string | undefined): string => {
	return currentAnswer || "";
};

const getTotalSteps = (questions: null | QuizQuestionsResponseDto): number => {
	return (
		(questions?.items.length ?? QuizIndexes.ZERO_INDEX) +
		QuizIndexes.FIRST_INDEX
	);
};

const isNotesPage = (
	currentQuestion: number,
	questions: null | QuizQuestionsResponseDto,
): boolean => {
	return currentQuestion > (questions?.items.length ?? QuizIndexes.ZERO_INDEX);
};

const getCurrentQuestionData = (
	questions: null | QuizQuestionsResponseDto,
	currentQuestion: number,
): QuestionDto | undefined => {
	return questions?.items[currentQuestion - QuizIndexes.FIRST_INDEX];
};

const getCurrentAnswer = (
	answers: Record<number, QuizAnswer>,
	currentQuestion: number,
): QuizAnswer | undefined => {
	return answers[currentQuestion];
};

const isQuestionCompleted = (
	currentQuestion: number,
	questionNumber: number,
): boolean => {
	return currentQuestion > questionNumber;
};

const isCurrentQuestion = (
	currentQuestion: number,
	questionNumber: number,
): boolean => {
	return currentQuestion === questionNumber;
};

const hasNoQuestions = (
	questions: null | QuizQuestionsResponseDto,
): boolean => {
	return !questions || questions.items.length === QuizIndexes.ZERO_INDEX;
};

const isQuestionNotFound = (
	currentQuestionData: QuestionDto | undefined,
): boolean => {
	return !currentQuestionData;
};

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
};
