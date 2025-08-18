import { ApiSchemas } from "~/libs/modules/api/schema/schema.js";

const MOCK_PLAN: ApiSchemas["PlanDaysTaskDto"] = {
	id: 1,
	title: "Personalized Fitness Plan",
	duration: 5,
	intensity: "high",
	userId: 42,
	days: [
		{
			id: 101,
			dayNumber: 1,
			tasks: [
				{
					id: 1001,
					title: "Morning Run",
					description: "Run 3 km at a moderate pace",
					order: 1,
					isCompleted: false,
					executionTimeType: "morning",
					completedAt: null,
				},
				{
					id: 1002,
					title: "Stretching",
					description: "15 minutes full-body stretching",
					order: 2,
					isCompleted: false,
					executionTimeType: "morning",
					completedAt: null,
				},
			],
		},
		{
			id: 102,
			dayNumber: 2,
			tasks: [
				{
					id: 1003,
					title: "Strength Training",
					description: "Upper body workout for 45 minutes",
					order: 1,
					isCompleted: false,
					executionTimeType: "afternoon",
					completedAt: null,
				},
			],
		},
	],
};

const MIN_DELAY_MS = 1000;
const MAX_DELAY_MS = 10000;

export { MOCK_PLAN, MIN_DELAY_MS, MAX_DELAY_MS };
