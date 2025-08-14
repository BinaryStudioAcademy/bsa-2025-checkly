import { type Knex } from "knex";

const TABLE_NAME = "users";
const COLUMN_NAME = "dob";

function down(knex: Knex): Promise<void> {
	return knex.schema.table(TABLE_NAME, (table) => {
		table.dropColumn(COLUMN_NAME);
	});
}

function up(knex: Knex): Promise<void> {
	return knex.schema.table(TABLE_NAME, (table) => {
		table.date(COLUMN_NAME);
	});
}

export { down, up };
