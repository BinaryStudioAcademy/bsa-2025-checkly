import { type QUESTION_TYPE } from "../enums/enums.js";

type QuestionType = (typeof QUESTION_TYPE)[keyof typeof QUESTION_TYPE];

export { type QuestionType };
