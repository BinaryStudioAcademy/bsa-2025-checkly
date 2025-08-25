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

const MOCK_REGENERATED_TASK: ApiSchemas["TaskDto"] = {
	id: 101,
	title: "Task regenerated",
	description: "Just regenerated",
	order: 1,
	isCompleted: false,
	executionTimeType: "morning",
	completedAt: null,
};

const MOCK_REGENERATED_PLAN_DAY: ApiSchemas["PlanDayDto"] = {
	id: 101,
	dayNumber: 1,
	tasks: [
		{
			id: 1001,
			title: "Programming with Knut",
			description: "Run 3 km at a moderate pace",
			order: 1,
			isCompleted: false,
			executionTimeType: "morning",
			completedAt: null,
		},
		{
			id: 1002,
			title: "Reading session",
			description: "15 minutes full-body stretching",
			order: 2,
			isCompleted: false,
			executionTimeType: "morning",
			completedAt: null,
		},
	],
};

const MIN_DELAY_MS = 1000;
const MAX_DELAY_MS = 10000;

const NOT_FOUND_INDEX = -1;

const ErrorMessage = {
	MISSING_PARAMS: "Missing required parameters",
	DAY_OR_TASKS_NOT_FOUND: "Target day or tasks not found",
	TASK_NOT_FOUND: "Task not found",
} as const;

export {
	MOCK_PLAN,
	ErrorMessage,
	MOCK_REGENERATED_TASK,
	MOCK_REGENERATED_PLAN_DAY,
	NOT_FOUND_INDEX,
	MIN_DELAY_MS,
	MAX_DELAY_MS,
};
