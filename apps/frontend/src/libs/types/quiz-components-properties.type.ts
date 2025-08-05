import { type EnumValue, type QuestionDto, type QuizCategory } from "shared";

import { type QuizAnswer } from "~/modules/quiz/quiz.js";

interface CheckboxQuestionProperties {
	currentAnswer?: string[];
	onAnswer: (answer: string[]) => void;
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
	currentAnswer?: QuizAnswer | undefined;
	onAnswer: (answer: Array<number | string>) => void;
	question?: QuestionDto | undefined;
}

interface QuizCategoryCardProperties extends QuizCategoryProperties {
	onSelect: () => void;
}

interface QuizCategoryProperties {
	category: EnumValue<typeof QuizCategory>;
	color: string;
	icon: string;
	selected: boolean;
}

interface RadioQuestionProperties {
	currentAnswer?: string;
	onAnswer: (answer: string) => void;
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
