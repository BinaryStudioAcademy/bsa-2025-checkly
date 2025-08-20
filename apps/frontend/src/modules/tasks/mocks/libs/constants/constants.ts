import { type TaskDto } from "~/modules/tasks/libs/types/types.js";

const MOCK_TASKS: TaskDto[] = [
	{
		id: 1001,
		title: "Morning Run",
		description: "Run 3 km at a moderate pace",
		order: 1,
		isCompleted: false,
		executionTimeType: "morning",
		completedAt: null,
		planDayId: 101,
	},
	{
		id: 1002,
		title: "Stretching",
		description: "15 minutes full-body stretching",
		order: 2,
		isCompleted: false,
		executionTimeType: "morning",
		completedAt: null,
		planDayId: 101,
	},
	{
		id: 1003,
		title: "Strength Training",
		description: "Upper body workout for 45 minutes",
		order: 1,
		isCompleted: false,
		executionTimeType: "afternoon",
		completedAt: null,
		planDayId: 102,
	},
];

export { MOCK_TASKS };
