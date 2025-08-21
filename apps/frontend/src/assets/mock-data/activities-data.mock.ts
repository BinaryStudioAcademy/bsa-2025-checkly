import { type PlanEditForm } from "~/libs/types/types.js";

const activitiesMockData: PlanEditForm = {
	days: [
		{
			dayNumber: 1,
			id: "day-1",
			tasks: [
				{
					description: "Set a calm tone every day.",
					id: "day-1-task-1",
					isCompleted: false,
					title: "Start the day with guided meditation.",
				},
				{
					description: "Practice gratitude in your journal.",
					id: "day-1-task-2",
					isCompleted: false,
					title: "Write down three things you are grateful for.",
				},
				{
					description: "Focus on every bite and flavor.",
					id: "day-1-task-3",
					isCompleted: false,
					title: "Practice mindful eating at lunch.",
				},
				{
					description: "Know what you want to achieve.",
					id: "day-1-task-4",
					isCompleted: false,
					title: "Set an intention for the week.",
				},
				{
					description: "Spend one hour without screens.",
					id: "day-1-task-5",
					isCompleted: false,
					title: "Do a digital detox before bed.",
				},
			],
		},
		{
			dayNumber: 2,
			id: "day-2",
			tasks: [
				{
					description: "Choose your favorite physical exercise.",
					id: "day-2-task-1",
					isCompleted: false,
					title: "Do 30 minutes of physical activity.",
				},
				{
					description: "Start the day with good energy.",
					id: "day-2-task-2",
					isCompleted: false,
					title: "Prepare a healthy breakfast.",
				},
				{
					description: "Hydration is essential for you.",
					id: "day-2-task-3",
					isCompleted: false,
					title: "Drink at least 8 glasses of water.",
				},
				{
					description: "Improve your body flexibility.",
					id: "day-2-task-4",
					isCompleted: false,
					title: "Do a stretching routine.",
				},
				{
					description: "Proper rest is very important.",
					id: "day-2-task-5",
					isCompleted: false,
					title: "Go to bed 30 minutes earlier.",
				},
			],
		},
		{
			dayNumber: 3,
			id: "day-3",
			tasks: [
				{
					description: "Choose a subject that interests you.",
					id: "day-3-task-1",
					isCompleted: false,
					title: "Read a chapter of a book.",
				},
				{
					description: "Learn something new on your commute.",
					id: "day-3-task-2",
					isCompleted: false,
					title: "Listen to an educational podcast today.",
				},
				{
					description: "It can be a language or programming.",
					id: "day-3-task-3",
					isCompleted: false,
					title: "Learn a new skill online.",
				},
				{
					description: "Explore a topic of your curiosity.",
					id: "day-3-task-4",
					isCompleted: false,
					title: "Watch an interesting documentary.",
				},
				{
					description: "Reflect on your learning.",
					id: "day-3-task-5",
					isCompleted: false,
					title: "Write down one new thing you learned.",
				},
			],
		},
		{
			dayNumber: 4,
			id: "day-4",
			tasks: [
				{
					description: "Listen without interrupting the other person.",
					id: "day-4-task-1",
					isCompleted: false,
					title: "Practice active listening today.",
				},
				{
					description: "Keep your social bonds strong.",
					id: "day-4-task-2",
					isCompleted: false,
					title: "Connect with a friend or family member.",
				},
				{
					description: "A small gesture can change a day.",
					id: "day-4-task-3",
					isCompleted: false,
					title: "Do a random act of kindness.",
				},
				{
					description: "Identify what you felt and why.",
					id: "day-4-task-4",
					isCompleted: false,
					title: "Write about your emotions.",
				},
				{
					description: "Strengthen your personal connections.",
					id: "day-4-task-5",
					isCompleted: false,
					title: "Express gratitude to a loved one.",
				},
			],
		},
		{
			dayNumber: 5,
			id: "day-5",
			tasks: [
				{
					description: "It can be drawing, writing, or playing music.",
					id: "day-5-task-1",
					isCompleted: false,
					title: "Dedicate 30 minutes to a hobby.",
				},
				{
					description: "A clean environment helps you focus.",
					id: "day-5-task-2",
					isCompleted: false,
					title: "Organize a small area of your home.",
				},
				{
					description: "Think of something that relaxes you.",
					id: "day-5-task-3",
					isCompleted: false,
					title: "Plan an activity for the weekend.",
				},
				{
					description: "Let the music take over you.",
					id: "day-5-task-4",
					isCompleted: false,
					title: "Listen to a playlist and dance.",
				},
				{
					description: "Think about what you have achieved.",
					id: "day-5-task-5",
					isCompleted: false,
					title: "Reflect on your achievements today.",
				},
			],
		},
		{
			dayNumber: 6,
			id: "day-6",
			tasks: [
				{
					description: "Go to a park or trail.",
					id: "day-6-task-1",
					isCompleted: false,
					title: "Spend an hour in nature.",
				},
				{
					description: "Be present in a conversation with someone.",
					id: "day-6-task-2",
					isCompleted: false,
					title: "Have a conversation without your phone.",
				},
				{
					description: "Cooking can be very relaxing.",
					id: "day-6-task-3",
					isCompleted: false,
					title: "Try a new recipe today.",
				},
				{
					description: "It can be a museum or a café.",
					id: "day-6-task-4",
					isCompleted: false,
					title: "Visit a new place in the city.",
				},
				{
					description: "Appreciate the little things around you.",
					id: "day-6-task-5",
					isCompleted: false,
					title: "Take photos of beautiful things.",
				},
			],
		},
		{
			dayNumber: 7,
			id: "day-7",
			tasks: [
				{
					description: "See what worked and what didn’t.",
					id: "day-7-task-1",
					isCompleted: false,
					title: "Review the highlights of the week.",
				},
				{
					description: "Set your focus for the coming days.",
					id: "day-7-task-2",
					isCompleted: false,
					title: "Plan 3 priorities for the week.",
				},
				{
					description: "Make your daily routine easier.",
					id: "day-7-task-3",
					isCompleted: false,
					title: "Prepare healthy snacks for the days.",
				},
				{
					description: "Start the week with everything organized.",
					id: "day-7-task-4",
					isCompleted: false,
					title: "Tidy up your space for the week.",
				},
				{
					description: "It can be a bath or reading.",
					id: "day-7-task-5",
					isCompleted: false,
					title: "Do a relaxing activity today.",
				},
			],
		},
	],
	notes:
		"Be flexible and kind to yourself. Consistency is the key to everything!",
	startDate: "2024-01-01",
	theme: "COLOURFUL",
	title: "7-Day Mindfulness Challenge",
};

export { activitiesMockData };
