import { type Knex } from "knex";

const TABLE_NAME = "feedback";

const ColumnName = {
	CREATED_AT: "created_at",
	ID: "id",
	TEXT: "text",
	UPDATED_AT: "updated_at",
	USER_ID: "user_id",
} as const;

function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(TABLE_NAME);
}

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table.text(ColumnName.TEXT).notNullable();
		table
			.integer(ColumnName.USER_ID)
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("users")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
		table
			.dateTime(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
	});
}

export { down, up };
