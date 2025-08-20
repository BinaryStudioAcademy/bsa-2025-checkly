import { ApiSchemas } from "~/libs/modules/api/schema/schema.js";

const MOCK_PLAN: ApiSchemas["PlanDaysTaskDto"] = {
	duration: 7,
	id: 32,
	intensity: "low",
	title:
		"30-Minute Daily Beginner Sport Improvement Plan for Low Activity Level",
	userId: 2,
	days: [
		{
			dayNumber: 1,
			id: 134,
			tasks: [
				{
					completedAt: null,
					description:
						"Start with 5 minutes of gentle stretching focusing on all major muscle groups to prepare your body for exercise and reduce injury risk.",
					executionTimeType: "morning",
					id: 181,
					isCompleted: false,
					order: 1,
					title: "Warm-Up: Gentle Full-Body Stretching",
				},
				{
					completedAt: null,
					description:
						"Engage in 10 minutes of brisk walking outdoors or marching in place to gradually raise your heart rate and improve cardiovascular fitness.",
					executionTimeType: "morning",
					id: 182,
					isCompleted: false,
					order: 2,
					title: "Brisk Walking or Marching in Place",
				},
				{
					completedAt: null,
					description:
						"Perform 10 bodyweight squats focusing on proper form to build foundational leg strength and enhance mobility.",
					executionTimeType: "morning",
					id: 183,
					isCompleted: false,
					order: 3,
					title: "Bodyweight Squats for Lower Body Strength",
				},
				{
					completedAt: null,
					description:
						"Do 10 wall push-ups to gently strengthen your chest, shoulders, and arms without overstraining your muscles.",
					executionTimeType: "morning",
					id: 184,
					isCompleted: false,
					order: 4,
					title: "Wall Push-Ups to Build Upper Body Strength",
				},
				{
					completedAt: null,
					description:
						"Finish with 5 minutes of deep breathing exercises and light stretching to relax your muscles and normalize your heart rate.",
					executionTimeType: "morning",
					id: 185,
					isCompleted: false,
					order: 5,
					title: "Cool-Down: Deep Breathing and Light Stretching",
				},
			],
		},
		{
			dayNumber: 2,
			id: 135,
			tasks: [
				{
					completedAt: null,
					description:
						"Spend 5 minutes performing gentle neck and shoulder rolls to loosen tension and prepare for activity.",
					executionTimeType: "evening",
					id: 186,
					isCompleted: false,
					order: 1,
					title: "Warm-Up: Neck and Shoulder Rolls",
				},
				{
					completedAt: null,
					description:
						"Do 10 minutes of side-to-side step touch movements to increase heart rate while minimizing joint stress.",
					executionTimeType: "evening",
					id: 187,
					isCompleted: false,
					order: 2,
					title: "Low-Impact Cardio: Step Touch Side to Side",
				},
				{
					completedAt: null,
					description:
						"Perform 10 slow leg raises while seated to strengthen the front thigh muscles and improve knee support.",
					executionTimeType: "evening",
					id: 188,
					isCompleted: false,
					order: 3,
					title: "Seated Leg Raises to Activate Quadriceps",
				},
				{
					completedAt: null,
					description:
						"Complete 10 forward and 10 backward arm circles while seated to enhance shoulder flexibility and circulation.",
					executionTimeType: "evening",
					id: 189,
					isCompleted: false,
					order: 4,
					title: "Seated Arm Circles for Shoulder Mobility",
				},
				{
					completedAt: null,
					description:
						"End with 5 minutes of full-body gentle stretching to increase flexibility and relaxation.",
					executionTimeType: "evening",
					id: 190,
					isCompleted: false,
					order: 5,
					title: "Cool-Down: Gentle Full-Body Stretching",
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
	MOCK_REGENERATED_PLAN_DAY,
	MOCK_REGENERATED_TASK,
	NOT_FOUND_INDEX,
	MIN_DELAY_MS,
	MAX_DELAY_MS,
};
