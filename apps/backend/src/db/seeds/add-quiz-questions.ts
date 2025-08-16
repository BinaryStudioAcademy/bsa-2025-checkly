import { type Knex } from "knex";

import { DatabaseTableName } from "~/libs/modules/database/database.js";

const QuizQuestionFormat = {
	MULTIPLE_CHOICE: "multiple_choice",
	MULTIPLE_CHOICE_WITH_TEXT_INPUT: "multiple_choice_with_text_input",
	SINGLE_CHOICE: "single_choice",
	SINGLE_CHOICE_WITH_TEXT_INPUT: "single_choice_with_text_input",
	TEXT_INPUT: "text_input",
} as const;

async function seed(knex: Knex): Promise<void> {
	await knex(DatabaseTableName.QUESTION_OPTIONS).del();
	await knex(DatabaseTableName.QUESTIONS).del();

	await knex(DatabaseTableName.QUESTIONS).insert([
		{
			id: 1,
			is_optional: false,
			order: 1,
			text: "What's your current goal or focus area?",
			type: QuizQuestionFormat.MULTIPLE_CHOICE_WITH_TEXT_INPUT,
		},
		{
			id: 2,
			is_optional: false,
			order: 2,
			text: "How much time can you realistically dedicate per day?",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
		{
			id: 3,
			is_optional: true,
			order: 3,
			text: "When do you usually have the most energy?",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
		{
			id: 4,
			is_optional: true,
			order: 4,
			text: "What type of tasks do you enjoy more?",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
		{
			id: 5,
			is_optional: true,
			order: 5,
			text: "What motivates you the most right now?",
			type: QuizQuestionFormat.SINGLE_CHOICE_WITH_TEXT_INPUT,
		},
		{
			id: 6,
			is_optional: true,
			order: 6,
			text: "How structured do you want your plan to be?",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
		{
			id: 7,
			is_optional: true,
			order: 7,
			text: "What’s your current emotional state?",
			type: QuizQuestionFormat.SINGLE_CHOICE_WITH_TEXT_INPUT,
		},
		{
			id: 8,
			is_optional: true,
			order: 8,
			text: "Do you want your plan to include social or interactive tasks?",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
		{
			id: 9,
			is_optional: true,
			order: 9,
			text: "Do you have any limitations we should consider?",
			type: QuizQuestionFormat.SINGLE_CHOICE_WITH_TEXT_INPUT,
		},
		{
			id: 10,
			is_optional: true,
			order: 10,
			text: "Have you ever followed a structured plan like this before?",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
		{
			id: 11,
			is_optional: true,
			order: 11,
			text: "Choose your plan duration",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
	]);

	await knex(DatabaseTableName.QUESTION_OPTIONS).insert([
		{ order: 1, question_id: 1, text: "💪 Health & Fitness" },
		{ order: 2, question_id: 1, text: "🧠 Personal Growth" },
		{ order: 3, question_id: 1, text: "💸 Money & Finances" },
		{ order: 4, question_id: 1, text: "💼 Career & Productivity" },
		{ order: 5, question_id: 1, text: "🧘 Mindfulness & Mental Health" },
		{ order: 6, question_id: 1, text: "🎨 Creativity & Art" },
		{ order: 7, question_id: 1, text: "🧩 Hobbies & Trying New Things" },
		{ order: 8, question_id: 1, text: "✍️ Other" },

		{ order: 1, question_id: 2, text: "⏱ 10–15 min" },
		{ order: 2, question_id: 2, text: "⏱ 20–30 min" },
		{ order: 3, question_id: 2, text: "⏱ 45–60 min" },
		{ order: 4, question_id: 2, text: "⏱ 1–2 hours" },
		{ order: 5, question_id: 2, text: "⏱ More than 2 hours" },

		{ order: 1, question_id: 3, text: "🌅 Morning" },
		{ order: 2, question_id: 3, text: "🌞 Midday" },
		{ order: 3, question_id: 3, text: "🌇 Evening" },
		{ order: 4, question_id: 3, text: "🌙 Night owl" },
		{ order: 5, question_id: 3, text: "🤷 Depends on the day" },

		{
			order: 1,
			question_id: 4,
			text: "🎯 Action-based (physical or practical tasks)",
		},
		{
			order: 2,
			question_id: 4,
			text: "🧘‍♀️ Reflective (journaling, mindfulness, thought exercises)",
		},
		{
			order: 3,
			question_id: 4,
			text: "🎓 Learning (courses, reading, exploration)",
		},
		{
			order: 4,
			question_id: 4,
			text: "🎨 Creative (writing, making, designing)",
		},
		{ order: 5, question_id: 4, text: "🌀 I like a mix!" },

		{ order: 1, question_id: 5, text: "🎁 Achieving a concrete result" },
		{ order: 2, question_id: 5, text: "🧭 Building new habits or discipline" },
		{ order: 3, question_id: 5, text: "🧡 Feeling better emotionally" },
		{ order: 4, question_id: 5, text: "💡 Exploring something ne" },
		{ order: 5, question_id: 5, text: "🧘‍♂️ Slowing down / restoring balance" },
		{ order: 6, question_id: 5, text: "✍️ Other" },

		{
			order: 1,
			question_id: 6,
			text: "📋 Fully structured (clear steps, order, timing)",
		},
		{
			order: 2,
			question_id: 6,
			text: "🧩 Semi-structured (general guide, but flexible)",
		},
		{
			order: 3,
			question_id: 6,
			text: "☁️ Loose & inspirational (just suggestions)",
		},

		{ order: 1, question_id: 7, text: "🥱 Tired" },
		{ order: 2, question_id: 7, text: "😵 Overwhelmed" },
		{ order: 3, question_id: 7, text: "😐 Meh" },
		{ order: 4, question_id: 7, text: "😊 Calm" },
		{ order: 5, question_id: 7, text: "🔥 Pumped & excited" },
		{ order: 6, question_id: 7, text: "✍️ Other" },

		{ order: 1, question_id: 8, text: "👯 Yes, I like engaging with others" },
		{ order: 2, question_id: 8, text: "☕ Only if it’s optional" },
		{ order: 3, question_id: 8, text: "🙅 No, I prefer solo activities" },

		{ order: 1, question_id: 9, text: "🧍‍♀️ Physical limitations" },
		{ order: 2, question_id: 9, text: "🕒 Limited free time" },
		{
			order: 3,
			question_id: 9,
			text: "🌐 No internet during parts of the day",
		},
		{ order: 4, question_id: 9, text: "📍 Only at home (can’t go out)" },
		{ order: 5, question_id: 9, text: "✍️ Other" },

		{ order: 1, question_id: 10, text: "✅ Yes, and I loved it" },
		{ order: 2, question_id: 10, text: "✅ Yes, but I dropped it quickly" },
		{ order: 3, question_id: 10, text: "❌ No, this is my first time" },
		{ order: 4, question_id: 10, text: "🤔 Not sure" },

		{ order: 1, question_id: 11, text: "5-day micro boost" },
		{ order: 2, question_id: 11, text: "14-day reset" },
		{ order: 3, question_id: 11, text: "21-day habit builde" },
		{ order: 4, question_id: 11, text: "🤷 Not sure yet — surprise me!" },
	]);
}

export { seed };
