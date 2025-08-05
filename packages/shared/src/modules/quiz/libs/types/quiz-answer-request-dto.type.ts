import { type QuestionDto } from "./question.dto.js";

type QuizAnswer = {
	isSkipped: boolean;
	question: QuestionDto;
	questionId: number;
	selectedOptions: (number | string)[];
	userInput: string;
};

type QuizAnswersRequestDto = {
	answers: QuizAnswer[];
	category: string;
	notes: string;
};

export { type QuizAnswer, type QuizAnswersRequestDto };