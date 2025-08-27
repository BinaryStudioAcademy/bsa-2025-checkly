import { type QuizAnswersRequestDto } from "../../../quiz/quiz.js";

type GeneratePlanRequestDto = {
	quizAnswers: QuizAnswersRequestDto;
	quizId?: number;
	userId?: number;
};

export { type GeneratePlanRequestDto };
