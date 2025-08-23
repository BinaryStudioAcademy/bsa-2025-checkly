import { ApiSchemas } from "~/libs/modules/api/schema/schema.js";

const MOCK_PLAN: ApiSchemas["PlanDaysTaskDto"] = {
	id: 32,
	userId: 2,
	title:
		"30-Minute Daily Beginner Sport Improvement Plan for Low Activity Level",
	duration: 7,
	intensity: "low",
	days: [
		{
			id: 134,
			dayNumber: 1,
			planId: 32,
			tasks: [
				{
					id: 181,
					planDayId: 134,
					title: "Warm-Up: Gentle Full-Body Stretching",
					description:
						"Start with 5 minutes of gentle stretching focusing on all major muscle groups to prepare your body for exercise and reduce injury risk.",
					order: 1,
					executionTimeType: "morning",
					isCompleted: false,
					completedAt: null,
				},
				{
					id: 182,
					planDayId: 134,
					title: "Brisk Walking or Marching in Place",
					description:
						"Engage in 10 minutes of brisk walking outdoors or marching in place to gradually raise your heart rate and improve cardiovascular fitness.",
					order: 2,
					executionTimeType: "morning",
					isCompleted: false,
					completedAt: null,
				},
				{
					id: 183,
					planDayId: 134,
					title: "Bodyweight Squats for Lower Body Strength",
					description:
						"Perform 10 bodyweight squats focusing on proper form to build foundational leg strength and enhance mobility.",
					order: 3,
					executionTimeType: "morning",
					isCompleted: false,
					completedAt: null,
				},
			],
		},
		{
			id: 135,
			dayNumber: 2,
			planId: 32,
			tasks: [
				{
					id: 186,
					planDayId: 135,
					title: "Warm-Up: Neck and Shoulder Rolls",
					description:
						"Spend 5 minutes performing gentle neck and shoulder rolls to loosen tension and prepare for activity.",
					order: 1,
					executionTimeType: "evening",
					isCompleted: false,
					completedAt: null,
				},
			],
		},
	],
};

const MOCK_GENERATED_PLAN: ApiSchemas["PlanDaysTaskDto"] = {
	id: 32,
	userId: 2,
	title: "Strength Training Plan",
	duration: 6,
	intensity: "high",
	days: [
		{
			id: 134,
			dayNumber: 1,
			planId: 32,
			tasks: [
				{
					id: 201,
					planDayId: 134,
					title: "Push-ups Advanced",
					description: "Do 40 push-ups",
					order: 1,
					executionTimeType: "short",
				},
				{
					id: 202,
					planDayId: 134,
					title: "Burpees",
					description: "Do 20 burpees",
					order: 2,
					executionTimeType: "short",
				},
			],
		},
		{
			id: 135,
			dayNumber: 2,
			planId: 32,
			tasks: [
				{
					id: 203,
					planDayId: 135,
					title: "Running",
					description: "Run 3km",
					order: 1,
					executionTimeType: "long",
				},
			],
		},
	],
};

const MOCK_REGENERATED_TASK: ApiSchemas["TaskDto"] = {
	id: 181,
	title: "Task Regenerated",
	description: "This task has been regenerated",
	order: 1,
	isCompleted: false,
	executionTimeType: "morning",
	completedAt: null,
};

const MOCK_REGENERATED_PLAN_DAY: ApiSchemas["PlanDayDto"] = {
	id: 134,
	dayNumber: 1,
	tasks: [
		{
			id: 1001,
			title: "Programming with Knuth",
			description: "Run 3 km at a moderate pace",
			order: 1,
			isCompleted: false,
			executionTimeType: "morning",
			completedAt: null,
		},
		{
			id: 1002,
			title: "Back Training",
			description: "15 minutes full-body stretching",
			order: 2,
			isCompleted: false,
			executionTimeType: "morning",
			completedAt: null,
		},
	],
};

const MOCK_ANSWERS = [
	{ id: 1, quizId: 100, option: "Option A" },
	{ id: 2, quizId: 100, option: "Option B" },
];

const MOCK_CATEGORY = {
	id: 10,
	title: "Strength Training",
};

const MIN_DELAY_MS = 1000;
const MAX_DELAY_MS = 10000;

const NOT_FOUND_INDEX = -1;

const ErrorMessage = {
	MISSING_PARAMS: "Missing required parameters",
	DAY_OR_TASKS_NOT_FOUND: "Target day or tasks not found",
	TASK_NOT_FOUND: "Task not found",
	PLAN_NOT_FOUND: "Plan not found",
	PLAN_DAY_NOT_FOUND: "Plan day not found",
	ANSWERS_NOT_FOUND: "Answers not found",
	CATEGORY_NOT_FOUND: "Category not found",
} as const;

export {
	MOCK_PLAN,
	ErrorMessage,
	MOCK_REGENERATED_PLAN_DAY,
	MOCK_REGENERATED_TASK,
	NOT_FOUND_INDEX,
	MIN_DELAY_MS,
	MOCK_GENERATED_PLAN,
	MOCK_CATEGORY,
	MOCK_ANSWERS,
	MAX_DELAY_MS,
};
