import { type Knex } from "knex";

const TABLE_NAME = "question_options";

const COLUMN_NAME = {
	CREATED_AT: "created_at",
	ID: "id",
	ORDER: "order",
	QUESTION_ID: "question_id",
	TEXT: "text",
	UPDATED_AT: "updated_at",
} as const;

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable(TABLE_NAME);
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(COLUMN_NAME.ID).primary();
		table
			.integer(COLUMN_NAME.QUESTION_ID)
			.notNullable()
			.references("id")
			.inTable("questions")
			.onDelete("CASCADE");
		table.integer(COLUMN_NAME.ORDER).notNullable();
		table.string(COLUMN_NAME.TEXT).notNullable();
		table
			.dateTime(COLUMN_NAME.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(COLUMN_NAME.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());

		table.unique([COLUMN_NAME.QUESTION_ID, COLUMN_NAME.ORDER]);
	});
}

export { down, up };
