import { type PlanActionType, type QuizAnswersRequestDto } from "shared";

type CreatePrompt = QuizAnswersRequestDto & {
	actionType: PlanActionType;
};

export { type CreatePrompt };
