import { type QuizAnswersRequestDto } from "../../../quiz/quiz.js";
import { type UserDto } from "../../../users/users.js";

type GeneratePlanRequestDto = {
	quizAnswers: QuizAnswersRequestDto;
	user: null | UserDto;
};

export { type GeneratePlanRequestDto };
