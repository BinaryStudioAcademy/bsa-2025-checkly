import { type Knex } from "knex";
import { QuizQuestionType } from "shared";

const TABLE_NAME = "questions";

const COLUMN_NAME = {
	CREATED_AT: "created_at",
	ID: "id",
	IS_OPTIONAL: "is_optional",
	ORDER: "order",
	TEXT: "text",
	TYPE: "type",
	UPDATED_AT: "updated_at",
} as const;

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable(TABLE_NAME);
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(COLUMN_NAME.ID).primary();
		table.string(COLUMN_NAME.TEXT).notNullable();
		table.integer(COLUMN_NAME.ORDER).unique().notNullable();
		table.boolean(COLUMN_NAME.IS_OPTIONAL).notNullable().defaultTo(false);
		table.enum(COLUMN_NAME.TYPE, Object.values(QuizQuestionType)).notNullable();
		table
			.dateTime(COLUMN_NAME.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(COLUMN_NAME.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
	});
}

export { down, up };
