import { type QuizAnswer } from "./quiz-answer.type.js";

type QuizAnswerOptionsRequestDto = {
	answers: QuizAnswer[];
	quizId: number;
};

export { type QuizAnswerOptionsRequestDto };
