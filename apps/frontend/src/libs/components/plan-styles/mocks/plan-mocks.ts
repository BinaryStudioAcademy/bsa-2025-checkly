import { ONE, ZERO } from "~/libs/constants/constants.js";
import { type Plan, type PlanDay, type Task } from "~/libs/types/types.js";

const DAY_NUM = 7;
const PLAN_TITLE = "Wellness Week";

const DAY_ACTIVITIES: string[][] = [
	[
		"Run 5km in the park",
		"Prepare oatmeal with fruit for breakfast",
		"15 min full-body stretching routine",
		"Review work tasks for the day",
		"Call a friend to catch up",
	],
	[
		"Upper body strength workout at the gym",
		"Drink a protein shake post-workout",
		"10 min guided meditation for focus",
		"Cook grilled chicken and veggies for lunch",
		"Read 20 pages of a personal development book",
	],
	[
		"Attend a morning yoga class",
		"Eat a banana and almonds as a snack",
		"Write a journal entry about yesterday",
		"Cycle 10km through city trails",
		"Listen to a relaxing music playlist",
	],
	[
		"Swim 30 laps at the local pool",
		"Prepare a fresh salad with tuna",
		"HIIT session: 20 min alternating sprints and rests",
		"Blend a green smoothie with spinach and apple",
		"Watch a documentary about nutrition",
	],
	[
		"Rest day: gentle walk in the park",
		"Reflect and plan next week's goals",
		"Practice mindfulness for 15 minutes",
		"Cook a healthy dinner",
		"Read a fiction novel",
	],
	[
		"Full-body stretching routine",
		"Prepare scrambled eggs with spinach",
		"Strength training: legs and core",
		"Review personal goals",
		"Call family to check in",
	],
	[
		"Morning jog around the neighborhood",
		"Make a fruit smoothie",
		"Yoga session for flexibility",
		"Write a gratitude list",
		"Plan meals for the upcoming week",
	],
];

const days: PlanDay[] = [];

for (let dayIndex = ZERO; dayIndex < DAY_NUM; dayIndex++) {
	const activities = DAY_ACTIVITIES[dayIndex] as string[];

	const tasks: Task[] = [];

	for (let taskIndex = ZERO; taskIndex < activities.length; taskIndex++) {
		const activity = activities[taskIndex] as string;

		tasks.push({
			description: activity,
			id: `${String(dayIndex)}-${String(taskIndex)}`,
			isCompleted: false,
			title: activity,
		});
	}

	days.push({
		dayNumber: dayIndex + ONE,
		id: String(dayIndex),
		tasks,
	});
}

const PLAN: Plan = {
	createdAt: "2025-08-30",
	days,
	id: ZERO.toString(),
	title: PLAN_TITLE,
};

export { PLAN };
