import { type Knex } from "knex";

const TABLE_NAME = "tasks";
const COLUMN_NAME = "description";

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.string(COLUMN_NAME);
	});
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn(COLUMN_NAME);
	});
}

export { down, up };
