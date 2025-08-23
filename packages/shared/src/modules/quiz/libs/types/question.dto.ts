import { type QuestionOptionDto } from "./question-option.dto.js";
import { type QuestionType } from "./quiz-question.type.js";

type QuestionDto = {
	id: number;
	isOptional: boolean;
	options: QuestionOptionDto[];
	text: string;
	type: QuestionType;
};

export { type QuestionDto };
