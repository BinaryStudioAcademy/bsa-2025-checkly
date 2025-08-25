import { type QuizAnswersRequestDto } from "../../../quiz/quiz.js";

type GeneratePlanRequestDto = {
	quizAnswers: QuizAnswersRequestDto;
	userId?: number;
};

export { type GeneratePlanRequestDto };
