import { type PlanEditForm } from "~/pages/plan-edit/libs/types/plan-edit-form.type.js";

const activitiesMockData: PlanEditForm = {
	days: [
		{
			activities: [
				{
					id: "day-1-task-1",
					text: "Start the day with a 10-minute guided meditation session.",
				},
				{
					id: "day-1-task-2",
					text: "Write down three things you are grateful for in a journal.",
				},
				{
					id: "day-1-task-3",
					text: "Practice mindful eating during lunch, focusing on each bite.",
				},
				{
					id: "day-1-task-4",
					text: "Set a clear intention for the week ahead.",
				},
				{
					id: "day-1-task-5",
					text: "Schedule a 1-hour digital detox before bed (no screens).",
				},
			],
			id: "day-1",
			topic: "Day 1: Mindfulness and Presence",
		},
		{
			activities: [
				{
					id: "day-2-task-1",
					text: "Engage in 30 minutes of physical activity (e.g., jogging, yoga, gym).",
				},
				{
					id: "day-2-task-2",
					text: "Prepare a healthy, nutrient-rich breakfast.",
				},
				{
					id: "day-2-task-3",
					text: "Ensure you drink at least 8 glasses of water throughout the day.",
				},
				{
					id: "day-2-task-4",
					text: "Perform a 15-minute stretching routine to improve flexibility.",
				},
				{
					id: "day-2-task-5",
					text: "Go to bed 30 minutes earlier to ensure adequate rest.",
				},
			],
			id: "day-2",
			topic: "Day 2: Physical Wellness",
		},
		{
			activities: [
				{
					id: "day-3-task-1",
					text: "Read one chapter of a non-fiction book on a new subject.",
				},
				{
					id: "day-3-task-2",
					text: "Listen to an educational podcast during your commute or break.",
				},
				{
					id: "day-3-task-3",
					text: "Spend 20 minutes learning a new skill online (e.g., a language, coding).",
				},
				{
					id: "day-3-task-4",
					text: "Watch a documentary on a topic that sparks your curiosity.",
				},
				{
					id: "day-3-task-5",
					text: "Write down one new thing you learned today and how you can apply it.",
				},
			],
			id: "day-3",
			topic: "Day 3: Mental Growth",
		},
		{
			activities: [
				{
					id: "day-4-task-1",
					text: "Practice active listening in a conversation without interrupting.",
				},
				{
					id: "day-4-task-2",
					text: "Reach out to a friend or family member just to check in.",
				},
				{
					id: "day-4-task-3",
					text: "Perform a random act of kindness for a stranger or colleague.",
				},
				{
					id: "day-4-task-4",
					text: "Journal about your emotions, identifying what you felt and why.",
				},
				{
					id: "day-4-task-5",
					text: "Reflect on a recent challenge and acknowledge your resilience.",
				},
			],
			id: "day-4",
			topic: "Day 4: Emotional Intelligence",
		},
		{
			activities: [
				{
					id: "day-5-task-1",
					text: "Dedicate 30 minutes to a creative hobby (drawing, writing, music).",
				},
				{
					id: "day-5-task-2",
					text: "Declutter and organize one small area of your home or workspace.",
				},
				{
					id: "day-5-task-3",
					text: "Plan a fun and relaxing activity for the weekend.",
				},
				{
					id: "day-5-task-4",
					text: "Listen to an uplifting playlist and allow yourself to dance.",
				},
				{
					id: "day-5-task-5",
					text: "Celebrate your accomplishments from the week, no matter how small.",
				},
			],
			id: "day-5",
			topic: "Day 5: Creativity and Celebration",
		},
		{
			activities: [
				{
					id: "day-6-task-1",
					text: "Spend at least one hour in nature (e.g., a park, hiking trail).",
				},
				{
					id: "day-6-task-2",
					text: "Have a meaningful, device-free conversation with a loved one.",
				},
				{
					id: "day-6-task-3",
					text: "Try a new recipe and enjoy the process of cooking.",
				},
				{
					id: "day-6-task-4",
					text: "Visit a local place you've never been to before (e.g., museum, cafe).",
				},
				{
					id: "day-6-task-5",
					text: "Engage in a hobby that brings you pure joy, without pressure.",
				},
			],
			id: "day-6",
			topic: "Day 6: Connection and Exploration",
		},
		{
			activities: [
				{
					id: "day-7-task-1",
					text: "Review the past week's highlights and challenges.",
				},
				{
					id: "day-7-task-2",
					text: "Plan your top 3 priorities for the upcoming week.",
				},
				{
					id: "day-7-task-3",
					text: "Prepare healthy snacks or meals for the next few days (meal prep).",
				},
				{
					id: "day-7-task-4",
					text: "Tidy your living space for a fresh and organized start to the week.",
				},
				{
					id: "day-7-task-5",
					text: "Do a relaxing activity, such as taking a bath or reading a novel.",
				},
			],
			id: "day-7",
			topic: "Day 7: Reflection and Planning",
		},
	],
	notes:
		"Remember to be flexible and kind to yourself. Consistency is the key!",
};

export { activitiesMockData };
