import { type QuestionDto } from "shared";

import { type QuizAnswer, type QuizCategoryValue } from "~/modules/quiz/quiz.js";

interface CheckboxQuestionProperties {
	currentAnswer?: (number | string)[];
	onAnswer: (answer: (number | string)[]) => void;
	question: QuestionDto;
}

interface ProgressBarProperties {
	currentQuestion: number;
	totalQuestions: number;
}

interface QuestionNavigationProperties {
	currentQuestion: number;
	isNextDisabled: boolean;
	onBack: () => void;
	onNext: () => void;
	onSkip: () => void;
	totalQuestions: number;
}

interface QuestionPageProperties {
	currentAnswer?: QuizAnswer;
	onAnswer: (answer: QuizAnswer) => void;
	question?: QuestionDto;
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
	currentAnswer?: number | string;
	onAnswer: (answer: number | string) => void;
	question: QuestionDto;
}

interface TextareaQuestionProperties {
	currentAnswer?: string;
	onAnswer: (answer: string) => void;
	question: QuestionDto & {
		description?: string;
		placeholder?: string;
	};
}

interface TextQuestionProperties {
	currentAnswer?: string;
	onAnswer: (answer: string) => void;
	question: QuestionDto;
}

export {
	type CheckboxQuestionProperties,
	type ProgressBarProperties,
	type QuestionNavigationProperties,
	type QuestionPageProperties,
	type QuizCategoryCardProperties,
	type QuizCategoryProperties,
	type RadioQuestionProperties,
	type TextareaQuestionProperties,
	type TextQuestionProperties,
};
