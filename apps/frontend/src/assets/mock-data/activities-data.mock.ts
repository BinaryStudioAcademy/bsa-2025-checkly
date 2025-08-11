import { type PlanEditForm } from "~/pages/plan-edit/libs/types/plan-edit-form.type.js";

const activitiesMockData: PlanEditForm = {
	days: [
		{
			activities: [
				{
					id: "day-1-task-1",
					text: "Meet a person in the cafe Meet a person in the cafe Meet a person in the cafe Meet a person in the cafe",
				},
				{
					id: "day-1-task-2",
					text: "Meet a person in the cafe Meet a person in the cafeMeet a person in the cafeMeet a person in the cafe Meet a person in the cafe Meet a person in the cafeMeet a person in the cafeMeet a person in the cafe Meet a person in the cafe Meet a person in the cafe",
				},
				{
					id: "day-1-task-3",
					text: "Meet a person in the cafe",
				},
				{
					id: "day-1-task-4",
					text: "Meet a person in the cafe Meet a person in the cafeMeet a person in the cafeMeet a person in the cafe",
				},
				{
					id: "day-1-task-5",
					text: "Meet a person in the cafe Meet a person in the cafeMeet a person in the cafeMeet a person in the cafe",
				},
			],
			id: "day-1",
			topic: "Day 1 - Networking and Connections",
		},
		{
			activities: [
				{
					id: "day-2-task-1",
					text: "Meet a person in the cafe - Meet a person in the cafe Meet a person in the cafeMeet a person in the cafeMeet a person in the cafe",
				},
				{
					id: "day-2-task-2",
					text: "Meet a person in the cafe - Meet a person in the cafe Meet a person in the cafeMeet a person in the cafeMeet a person in the cafe",
				},
				{
					id: "day-2-task-3",
					text: "Meet a person in the cafe - Meet a person in the cafe Meet a person in the cafeMeet a person in the cafeMeet a person in the cafe",
				},
			],
			id: "day-2",
			topic: "Day 2 - Personal Development",
		},
		{
			activities: [
				{
					id: "day-3-task-1",
					text: "Meet a person in the cafe - Meet a person in the cafe Meet a person in the cafeMeet a person in the cafeMeet a person in the cafe",
				},
				{
					id: "day-3-task-2",
					text: "Meet a person in the cafe - Meet a person in the cafe Meet a person in the cafeMeet a person in the cafeMeet a person in the cafe",
				},
				{
					id: "day-3-task-3",
					text: "Meet a person in the cafe - Meet a person in the cafe Meet a person in the cafeMeet a person in the cafeMeet a person in the cafe",
				},
				{
					id: "day-3-task-4",
					text: "Meet a person in the cafe - Meet a person in the cafe Meet a person in the cafeMeet a person in the cafeMeet a person in the cafe",
				},
			],
			id: "day-3",
			topic: "Day 3 - Projects and Creativity",
		},
		{
			activities: [
				{
					id: "day-4-task-1",
					text: "Meet a person in the cafe - Meet a person in the cafe Meet a person in the cafeMeet a person in the cafeMeet a person in the cafe",
				},
			],
			id: "day-4",
			topic: "Day 4 - Reflection and Planning",
		},
	],
	notes:
		"This is a mock plan. Remember to drink water and stretch every hour. Consistency is key to success.",
};

export { activitiesMockData };
