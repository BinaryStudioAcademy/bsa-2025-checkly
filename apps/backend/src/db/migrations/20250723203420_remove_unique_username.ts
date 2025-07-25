import { type Knex } from "knex";

const TABLE_NAME = "users";
const COLUMN_NAME = "name";

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.unique([COLUMN_NAME]);
	});
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropUnique([COLUMN_NAME]);
	});
}

export { down, up };
