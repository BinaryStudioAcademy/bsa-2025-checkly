import { type Knex } from "knex";

const TABLE_NAME = "tasks";
const COLUMN_NAME = "description";

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.string(COLUMN_NAME).notNullable().alter();
	});
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.string(COLUMN_NAME).nullable().alter();
	});
}

export { down, up };
