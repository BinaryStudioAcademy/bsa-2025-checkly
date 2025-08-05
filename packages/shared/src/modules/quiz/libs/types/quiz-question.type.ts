import { type QuizQuestionType } from "../enums/enums.js";

type QuestionType = (typeof QuizQuestionType)[keyof typeof QuizQuestionType];

export { type QuestionType };
