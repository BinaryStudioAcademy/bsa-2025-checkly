import { type QuizQuestionFormat } from "../enums/enums.js";

type QuestionType =
	(typeof QuizQuestionFormat)[keyof typeof QuizQuestionFormat];

export { type QuestionType };