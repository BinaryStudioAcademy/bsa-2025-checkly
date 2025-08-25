import { type PlanDaysTaskDto } from "~/modules/plans/libs/types/types.js";

const MOCK_GENERATED_PLAN: PlanDaysTaskDto = {
	categoryId: 2,
	days: [
		{
			dayNumber: 1,
			id: 1,
			tasks: [],
		},
		{
			dayNumber: 2,
			id: 2,
			tasks: [
				{
					completedAt: null,
					executionTimeType: "morning",
					id: 2,
					isCompleted: false,
					order: 1,
					title: "Meet a person in the cafe",
				},
				{
					completedAt: null,
					executionTimeType: "evening",
					id: 3,
					isCompleted: false,
					order: 2,
					title: "Meet a person in the cafe",
				},
			],
		},
	],
	duration: 5,
	id: 1,
	intensity: "high",
	quizId: 1,
    styleId: 1,
	title: "Some plan",
	userId: 2,
};

export { MOCK_GENERATED_PLAN };
export {
	STYLE_ANSWER_MAP,
	STYLE_ANSWER_MIX,
	STYLE_QUESTION_TEXT,
	TIME_ANSWER_20_30_MIN,
	TIME_ANSWER_MAP,
	TIME_QUESTION_TEXT,
} from "./plan-prompt.constants.js";
export { TASK_GENERATION_RULES } from "./task-generation-rules.constants.js";
export { LAST_INDEX } from "shared";