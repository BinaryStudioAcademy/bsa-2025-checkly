import { type Knex } from "knex";

import { DatabaseTableName } from "~/libs/modules/database/database.js";

async function seed(knex: Knex): Promise<void> {
	await knex(DatabaseTableName.TASKS).del();
	await knex(DatabaseTableName.PLAN_DAYS).del();
	await knex(DatabaseTableName.PLANS).del();
	await knex(DatabaseTableName.PLAN_CATEGORIES).del();

	await knex(DatabaseTableName.PLAN_CATEGORIES).insert([
		{
			id: 1,
			title: "Personal development",
		},
		{
			id: 2,
			title: "Spirituality",
		},
		{
			id: 3,
			title: "Sport",
		},
		{
			id: 4,
			title: "Money",
		},
		{
			id: 5,
			title: "Creativity",
		},
		{
			id: 6,
			title: "Hobby",
		},
	]);
}

export { seed };
