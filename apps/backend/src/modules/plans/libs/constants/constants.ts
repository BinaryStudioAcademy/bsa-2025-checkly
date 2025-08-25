import {
	type PlanDayDto,
	type PlanDaysTaskDto,
	type TaskDto,
} from "~/modules/plans/libs/types/types.js";

const MOCK_GENERATED_PLAN: PlanDaysTaskDto = {
	categoryId: 2,
	days: [
		{
			dayNumber: 1,
			id: 1,
			planId: 1,
			tasks: [],
		},
		{
			dayNumber: 2,
			id: 2,
			planId: 1,
			tasks: [
				{
					completedAt: null,
					description: "Meet a person in the cafe multiple times...",
					executionTimeType: "morning",
					id: 2,
					isCompleted: false,
					order: 1,
					planDayId: 1,
					title: "Meet a person in the cafe",
				},
				{
					completedAt: null,
					description: "Meet a person in the cafe multiple times...",
					executionTimeType: "evening",
					id: 3,
					isCompleted: false,
					order: 2,
					planDayId: 2,
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

const MOCK_GENERATED_PLAN_DAY: PlanDayDto = {
	dayNumber: 2,
	id: 2,
	planId: 58,
	tasks: [
		{
			completedAt: null,
			description: "Hello",
			executionTimeType: "morning",
			id: 2,
			isCompleted: false,
			order: 1,
			planDayId: 1,
			title: "Meet a person in the cafe",
		},
		{
			completedAt: null,
			description: "Meet a person in the cafe multiple times...",
			executionTimeType: "evening",
			id: 3,
			isCompleted: false,
			order: 2,
			planDayId: 1,
			title: "Meet a person in the cafe",
		},
	],
};

const MOCK_GENERATED_TASK: TaskDto = {
	completedAt: null,
	description: "Hello2-------------",
	executionTimeType: null,
	id: 2,
	isCompleted: false,
	order: 1,
	planDayId: 259,
	title: "Meet a person in the cafe",
};

export { MOCK_GENERATED_PLAN, MOCK_GENERATED_PLAN_DAY, MOCK_GENERATED_TASK };
export { LAST_INDEX } from "shared";
