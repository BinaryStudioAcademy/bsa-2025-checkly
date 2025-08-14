import { type Knex } from "knex";

const TABLE_NAME = "users";
const COLUMN_NAME = "avatar_url";

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn(COLUMN_NAME);
	});
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.text(COLUMN_NAME);
	});
}

export { down, up };
