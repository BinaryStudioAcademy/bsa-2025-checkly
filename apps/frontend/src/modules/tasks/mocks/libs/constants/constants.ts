import { type TaskDto } from "~/modules/tasks/libs/types/types.js";

const MOCK_TASKS: TaskDto[] = [
	{
		id: 1001,
		title: "Morning Run",
		order: 1,
		isCompleted: false,
		executionTimeType: "morning",
		completedAt: null,
		planDayId: 101,
	},
	{
		id: 1002,
		title: "Stretching",
		order: 2,
		isCompleted: false,
		executionTimeType: "morning",
		completedAt: null,
		planDayId: 101,
	},
	{
		id: 1003,
		title: "Strength Training",
		order: 1,
		isCompleted: false,
		executionTimeType: "afternoon",
		completedAt: null,
		planDayId: 102,
	},
];

export { MOCK_TASKS };
