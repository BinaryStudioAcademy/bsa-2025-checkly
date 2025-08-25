import { type Knex } from "knex";

import { DatabaseTableName } from "~/libs/modules/database/database.js";

const PLAN_STYLES = [
	{ name: "MINIMAL" },
	{ name: "WITH_REMARKS" },
	{ name: "COLOURFUL" },
];

async function seed(knex: Knex): Promise<void> {
	await knex(DatabaseTableName.PLAN_STYLES)
		.insert(PLAN_STYLES)
		.onConflict("name")
		.ignore();
}

export { seed };
