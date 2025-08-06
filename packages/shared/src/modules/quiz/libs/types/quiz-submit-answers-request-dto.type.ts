import { type QuizAnswer } from "./quiz-answer.type.js";
import { type QuizCategoryType } from "./quiz-category.type.js";

type QuizAnswersRequestDto = {
	answers: QuizAnswer[];
	category: QuizCategoryType;
	notes: string;
};

export { type QuizAnswersRequestDto };