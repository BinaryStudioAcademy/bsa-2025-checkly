import { type Knex } from "knex";
import { QuizQuestionFormat } from "shared";

import { DatabaseTableName } from "~/libs/modules/database/database.js";

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
	]);
}

export { seed };
