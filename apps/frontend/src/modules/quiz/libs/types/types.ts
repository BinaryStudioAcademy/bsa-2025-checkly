import { type EnumValue, type QuizCategory } from "shared";

type QuizCategoryValue = EnumValue<typeof QuizCategory>;

export {
	type QuestionDto,
	type QuizAnswer,
	type QuizQuestionsResponseDto,
} from "shared";
export { type QuizCategoryValue };
