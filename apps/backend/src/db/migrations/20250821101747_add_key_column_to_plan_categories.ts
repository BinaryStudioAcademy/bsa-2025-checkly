import { type Knex } from "knex";

const TABLE_NAME = "plan_categories";
const COLUMN_NAME = "key";

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn(COLUMN_NAME);
	});
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.string(COLUMN_NAME).notNullable();
	});
}

export { down, up };
