import { type QuizAnswer } from "./quiz-answer.type.js";
import { type QuizCategoryType } from "./quiz-category.type.js";
import { type QuizContext } from "./quiz-context.type.js";

type QuizAnswersRequestDto = {
	answers: QuizAnswer[];
	category: QuizCategoryType;
	context?: QuizContext;
	notes?: string;
};

export { type QuizAnswersRequestDto };
