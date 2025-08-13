import { type EnumValue, type QuizCategory } from "shared";

type QuizCategoryValue = EnumValue<typeof QuizCategory>;

export {
	type PlanDaysTaskDto,
	type QuestionDto,
	type QuizAnswer,
	type QuizAnswersRequestDto,
	type QuizQuestionsResponseDto,
} from "shared";
export { type QuizCategoryValue };
