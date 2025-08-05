import { type QuizAnswer } from "./quiz-answer.type.js";

type QuizAnswersRequestDto = {
	answers: QuizAnswer[];
	category: string;
	notes: string;
};

export { type QuizAnswersRequestDto };
