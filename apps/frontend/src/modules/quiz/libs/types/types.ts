import { type EnumValue, type QuizCategory } from "shared";

interface QuizAnswer {
	answer: Array<number | string>;
	isSkipped: boolean;
	questionId: number;
}

type QuizCategoryValue = EnumValue<typeof QuizCategory>;

interface QuizSubmission {
	answers: QuizAnswer[];
	category: QuizCategoryValue;
	notes: string;
}

export { type QuizAnswer, type QuizSubmission };
export { type QuestionType, QuizCategory, type QuizQuestionsResponseDto } from "shared";