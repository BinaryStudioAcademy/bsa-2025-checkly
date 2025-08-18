import { type PlanDaysTaskDto } from "~/modules/plans/libs/types/types.js";

const MOCK_GENERATED_PLAN: PlanDaysTaskDto = {
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
					description: "Meet a person in the cafe multiple times...",
					executionTimeType: "morning",
					id: 2,
					isCompleted: false,
					order: 1,
					title: "Meet a person in the cafe",
				},
				{
					completedAt: null,
					description: "Meet a person in the cafe multiple times...",
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
	title: "Some plan",
	userId: 2,
};

export { MOCK_GENERATED_PLAN };
