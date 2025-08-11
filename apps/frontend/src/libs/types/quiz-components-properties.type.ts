import { type QuestionDto } from "~/libs/types/types.js";
import {
	type QuizAnswer,
	type QuizCategoryValue,
} from "~/modules/quiz/quiz.js";

interface CheckboxQuestionProperties {
	currentAnswer?: MultipleAnswers[];
	onAnswer: (answer: MultipleAnswers[]) => void;
	question: QuestionDto;
}

interface MixedQuestionProperties {
	currentAnswer?: {
		selectedOptions: MultipleAnswers[];
		userInput: string;
	};
	onAnswer: (answer: {
		selectedOptions: MultipleAnswers[];
		userInput: string;
	}) => void;
	question: QuestionDto;
}

type MultipleAnswers = number | string;

interface ProgressBarProperties {
	currentQuestion: number;
	totalQuestions: number;
}

interface QuestionNavigationProperties {
	currentQuestion: number;
	isNextDisabled: boolean;
	isQuestionRequired: boolean;
	onBack: () => void;
	onNext: () => void;
	onSkip: () => void;
	totalQuestions: number;
}

interface QuestionPageProperties {
	currentAnswer?: QuizAnswer;
	onAnswer: (answer: QuizAnswer) => void;
	question: QuestionDto;
	questionNumber?: number;
}

interface QuizCategoryCardProperties extends QuizCategoryProperties {
	onSelect: () => void;
}

interface QuizCategoryProperties {
	category: QuizCategoryValue;
	color: string;
	icon: string;
	selected: boolean;
}

interface RadioQuestionProperties {
	currentAnswer?: SingleAnswer;
	onAnswer: (answer: SingleAnswer) => void;
	question: QuestionDto;
}

type SingleAnswer = number | string;

interface TextQuestionProperties {
	currentAnswer?: string;
	onAnswer: (answer: string) => void;
	question: QuestionDto;
}

export {
	type CheckboxQuestionProperties,
	type MixedQuestionProperties,
	type MultipleAnswers,
	type ProgressBarProperties,
	type QuestionNavigationProperties,
	type QuestionPageProperties,
	type QuizCategoryCardProperties,
	type QuizCategoryProperties,
	type RadioQuestionProperties,
	type SingleAnswer,
	type TextQuestionProperties,
};
