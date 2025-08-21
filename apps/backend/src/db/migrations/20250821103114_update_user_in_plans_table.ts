import { type Knex } from "knex";

const TABLE_NAME = "plans";
const COLUMN_NAME = "user_id";

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.integer(COLUMN_NAME).notNullable().alter();
	});
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.integer(COLUMN_NAME).nullable().alter();
	});
}

export { down, up };
