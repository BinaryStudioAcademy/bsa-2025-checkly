import { type Knex } from "knex";

import { DatabaseTableName } from "~/libs/modules/database/database.js";

const plans = [
	{
		category_id: 3,
		created_at: new Date(),
		duration: 5,
		id: 1,
		intensity: "medium",
		title: "Daily Workout Routine",
		updated_at: new Date(),
		user_id: 1,
	},
	{
		category_id: 1,
		created_at: new Date(),
		duration: 14,
		id: 2,
		intensity: "medium",
		title: "Personal Growth Challenge",
		updated_at: new Date(),
		user_id: 1,
	},
	{
		category_id: 5,
		created_at: new Date(),
		duration: 21,
		id: 3,
		intensity: "low",
		title: "Creative Writing Journey",
		updated_at: new Date(),
		user_id: 1,
	},
	{
		category_id: 2,
		created_at: new Date(),
		duration: 14,
		id: 4,
		intensity: "low",
		title: "Meditation & Mindfulness",
		updated_at: new Date(),
		user_id: 1,
	},
	{
		category_id: 4,
		created_at: new Date(),
		duration: 21,
		id: 5,
		intensity: "high",
		title: "Financial Literacy Bootcamp",
		updated_at: new Date(),
		user_id: 1,
	},
	{
		category_id: 6,
		created_at: new Date(),
		duration: 14,
		id: 6,
		intensity: "medium",
		title: "Photography Skills",
		updated_at: new Date(),
		user_id: 1,
	},
	{
		category_id: 1,
		created_at: new Date(),
		duration: 21,
		id: 7,
		intensity: "low",
		title: "Morning Routine Builder",
		updated_at: new Date(),
		user_id: 1,
	},
	{
		category_id: 3,
		created_at: new Date(),
		duration: 5,
		id: 8,
		intensity: "high",
		title: "Quick Fitness Boost",
		updated_at: new Date(),
		user_id: 1,
	},
	{
		category_id: 6,
		created_at: new Date(),
		duration: 21,
		id: 9,
		intensity: "low",
		title: "Gardening Basics",
		updated_at: new Date(),
		user_id: 1,
	},
	{
		category_id: 4,
		created_at: new Date(),
		duration: 14,
		id: 10,
		intensity: "medium",
		title: "Investment Strategy",
		updated_at: new Date(),
		user_id: 1,
	},
	{
		category_id: 5,
		created_at: new Date(),
		duration: 14,
		id: 11,
		intensity: "medium",
		title: "Painting Fundamentals",
		updated_at: new Date(),
		user_id: 1,
	},
	{
		category_id: 2,
		created_at: new Date(),
		duration: 21,
		id: 12,
		intensity: "medium",
		title: "Spiritual Awakening",
		updated_at: new Date(),
		user_id: 1,
	},
];

async function seed(knex: Knex): Promise<void> {
	await knex(DatabaseTableName.PLANS).del();

	await knex(DatabaseTableName.PLANS).insert(plans);
}

export { seed };
