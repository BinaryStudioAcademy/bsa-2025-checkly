import { type QuestionDto } from "./question.dto.js";

type QuestionCategoryDto = {
	categoryId: number;
	id: number;
	order: number;
	question: QuestionDto;
	questionId: number;
};

export { type QuestionCategoryDto };
