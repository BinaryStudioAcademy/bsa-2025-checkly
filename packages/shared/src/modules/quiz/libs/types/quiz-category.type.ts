import { type QuizCategory } from "../enums/quiz-category.enum.js";

type QuizCategoryType = (typeof QuizCategory)[keyof typeof QuizCategory];

export { type QuizCategoryType };
