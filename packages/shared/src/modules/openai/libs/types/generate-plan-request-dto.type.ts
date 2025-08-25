import { type QuizAnswersRequestDto } from "../../../quiz/quiz.js";

type GeneratePlanRequestDto = {
	quizAnswers: QuizAnswersRequestDto;
	userId: null | number;
};

export { type GeneratePlanRequestDto };
