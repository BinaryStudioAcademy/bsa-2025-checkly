import { type Knex } from "knex";

const TABLE_NAMES = {
	ANSWER_OPTIONS: "answer_options",
	ANSWERS: "answers",
	PLANS: "plans",
	QUESTION_OPTIONS: "question_options",
	QUESTIONS: "questions",
	QUIZ: "quiz",
};

const QuizColumnName = {
	ID: "id",
} as const;

const AnswerColumnName = {
	ID: "id",
	IS_SKIPPED: "is_skipped",
	QUESTION_ID: "question_id",
	QUIZ_ID: "quiz_id",
	USER_INPUT: "user_input",
} as const;

const AnswerOptionColumnName = {
	ANSWER_ID: "answer_id",
	ID: "id",
	OPTION_ID: "option_id",
} as const;

const QuestionColumnName = {
	ID: "id",
} as const;

const OptionColumnName = {
	ID: "id",
} as const;

const PlanColumnName = {
	QUIZ_ID: "quiz_id",
} as const;

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAMES.PLANS, (table) => {
		table.dropColumn(PlanColumnName.QUIZ_ID);
	});

	await knex.schema.dropTableIfExists(TABLE_NAMES.ANSWER_OPTIONS);
	await knex.schema.dropTableIfExists(TABLE_NAMES.ANSWERS);
	await knex.schema.dropTableIfExists(TABLE_NAMES.QUIZ);
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE_NAMES.QUIZ, (table) => {
		table.increments(QuizColumnName.ID).primary();
	});

	await knex.schema.createTable(TABLE_NAMES.ANSWERS, (table) => {
		table.increments(AnswerColumnName.ID).primary();
		table
			.integer(AnswerColumnName.QUIZ_ID)
			.notNullable()
			.references(QuizColumnName.ID)
			.inTable(TABLE_NAMES.QUIZ)
			.onDelete("CASCADE");
		table
			.integer(AnswerColumnName.QUESTION_ID)
			.notNullable()
			.references(QuestionColumnName.ID)
			.inTable(TABLE_NAMES.QUESTIONS)
			.onDelete("CASCADE");
		table.text(AnswerColumnName.USER_INPUT);
		table.boolean(AnswerColumnName.IS_SKIPPED).notNullable().defaultTo(false);
	});

	await knex.schema.createTable(TABLE_NAMES.ANSWER_OPTIONS, (table) => {
		table.increments(AnswerOptionColumnName.ID).primary();
		table
			.integer(AnswerOptionColumnName.ANSWER_ID)
			.notNullable()
			.references(AnswerColumnName.ID)
			.inTable(TABLE_NAMES.ANSWERS)
			.onDelete("CASCADE");
		table
			.integer(AnswerOptionColumnName.OPTION_ID)
			.notNullable()
			.references(OptionColumnName.ID)
			.inTable(TABLE_NAMES.QUESTION_OPTIONS)
			.onDelete("CASCADE");
	});

	await knex.schema.alterTable(TABLE_NAMES.PLANS, (table) => {
		table
			.integer(PlanColumnName.QUIZ_ID)
			.references(QuizColumnName.ID)
			.inTable(TABLE_NAMES.QUIZ)
			.onDelete("SET NULL");
	});
}

export { down, up };
