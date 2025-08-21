import { type QuestionDto } from "~/libs/types/types.js";
import { type QuizAnswer } from "~/modules/quiz/quiz.js";

type CheckboxQuestionProperties = {
	currentAnswer?: MultipleAnswers[];
	onAnswer: (answer: MultipleAnswers[]) => void;
	question: QuestionDto;
};

type MixedAnswer = {
	selectedOptions: MultipleAnswers[];
	userInput: string;
};

type MixedQuestionProperties = {
	currentAnswer?: MixedAnswer;
	onAnswer: (answer: MixedAnswer) => void;
	question: QuestionDto;
};

type MultipleAnswers = number | string;

type ProgressBarProperties = {
	currentQuestion: number;
	totalQuestions: number;
};

type QuestionNavigationProperties = {
	currentQuestion: number;
	isNextDisabled: boolean;
	isQuestionRequired: boolean;
	onBack: () => void;
	onNext: () => void;
	onSkip: () => void;
	totalQuestions: number;
};

type QuestionPageProperties = {
	currentAnswer?: QuizAnswer;
	onAnswer: (answer: QuizAnswer) => void;
	question: QuestionDto;
	questionNumber?: number;
};

type QuizCategoryCardProperties = QuizCategoryProperties & {
	onSelect: () => void;
};

type QuizCategoryProperties = {
	categoryTitle: string;
	color: string;
	iconHref: string;
	selected: boolean;
};

type RadioQuestionProperties = {
	currentAnswer?: SingleAnswer;
	onAnswer: (answer: SingleAnswer) => void;
	question: QuestionDto;
};

type SingleAnswer = number | string;

type SingleChoiceWithTextAnswer = {
	selectedOption: null | string;
	userInput: string;
};

type SingleChoiceWithTextQuestionProperties = {
	currentAnswer?: SingleChoiceWithTextAnswer;
	onAnswer: (answer: SingleChoiceWithTextAnswer) => void;
	question: QuestionDto;
};

type TextQuestionProperties = {
	currentAnswer?: string;
	onAnswer: (answer: string) => void;
	question: QuestionDto;
};

export {
	type CheckboxQuestionProperties,
	type MixedAnswer,
	type MixedQuestionProperties,
	type MultipleAnswers,
	type ProgressBarProperties,
	type QuestionNavigationProperties,
	type QuestionPageProperties,
	type QuizCategoryCardProperties,
	type RadioQuestionProperties,
	type SingleAnswer,
	type SingleChoiceWithTextAnswer,
	type SingleChoiceWithTextQuestionProperties,
	type TextQuestionProperties,
};
