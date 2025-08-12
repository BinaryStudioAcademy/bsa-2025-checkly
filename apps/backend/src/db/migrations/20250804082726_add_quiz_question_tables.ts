import { type Knex } from "knex";

const QuizQuestionFormat = {
	MULTIPLE_CHOICE: "multiple_choice",
	MULTIPLE_CHOICE_WITH_TEXT_INPUT: "multiple_choice_with_text_input",
	SINGLE_CHOICE: "single_choice",
	SINGLE_CHOICE_WITH_TEXT_INPUT: "single_choice_with_text_input",
	TEXT_INPUT: "text_input",
} as const;

const QUESTIONS_TABLE_NAME = "questions";
const QUESTION_OPTIONS_TABLE_NAME = "question_options";

const QuestionsColumnName = {
	CREATED_AT: "created_at",
	ID: "id",
	IS_OPTIONAL: "is_optional",
	ORDER: "order",
	TEXT: "text",
	TYPE: "type",
	UPDATED_AT: "updated_at",
} as const;

const QuestionOptionsColumnName = {
	CREATED_AT: "created_at",
	ID: "id",
	ORDER: "order",
	QUESTION_ID: "question_id",
	TEXT: "text",
	UPDATED_AT: "updated_at",
} as const;

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable(QUESTIONS_TABLE_NAME);
	await knex.schema.dropTable(QUESTION_OPTIONS_TABLE_NAME);
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(QUESTIONS_TABLE_NAME, (table) => {
		table.increments(QuestionsColumnName.ID).primary();
		table.string(QuestionsColumnName.TEXT).notNullable();
		table.integer(QuestionsColumnName.ORDER).unique().notNullable();
		table
			.boolean(QuestionsColumnName.IS_OPTIONAL)
			.notNullable()
			.defaultTo(false);
		table
			.enum(QuestionsColumnName.TYPE, Object.values(QuizQuestionFormat))
			.notNullable();
		table
			.dateTime(QuestionsColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(QuestionsColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
	});

	await knex.schema.createTable(QUESTION_OPTIONS_TABLE_NAME, (table) => {
		table.increments(QuestionOptionsColumnName.ID).primary();
		table
			.integer(QuestionOptionsColumnName.QUESTION_ID)
			.notNullable()
			.references("id")
			.inTable("questions")
			.onDelete("CASCADE");
		table.integer(QuestionOptionsColumnName.ORDER).notNullable();
		table.string(QuestionOptionsColumnName.TEXT).notNullable();
		table
			.dateTime(QuestionOptionsColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(QuestionOptionsColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());

		table.unique([
			QuestionOptionsColumnName.QUESTION_ID,
			QuestionOptionsColumnName.ORDER,
		]);
	});
}

export { down, up };
