import { type Knex } from "knex";

const TableNames = {
	PLAN_CATEGORIES: "plan_categories",
	PLANS: "plans",
	QUESTIONS: "questions",
	QUESTIONS_CATEGORIES: "questions_categories",
};

const CategoriesColumnName = {
	SLUG: "slug",
};

const QuestionsColumnName = {
	ORDER: "order",
};

const QuestionsCategoriesColumnName = {
	CATEGORY_ID: "category_id",
	CREATED_AT: "created_at",
	ID: "id",
	ORDER: "order",
	QUESTION_ID: "question_id",
	UPDATED_AT: "updated_at",
} as const;

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable(TableNames.QUESTIONS_CATEGORIES);

	await knex.schema.alterTable(TableNames.PLAN_CATEGORIES, (table) => {
		table.dropColumn(CategoriesColumnName.SLUG);
	});
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TableNames.QUESTIONS, (table) => {
		table.dropColumn(QuestionsColumnName.ORDER);
	});

	await knex.schema.createTable(TableNames.QUESTIONS_CATEGORIES, (table) => {
		table.increments(QuestionsCategoriesColumnName.ID).primary();
		table.integer(QuestionsCategoriesColumnName.ORDER).notNullable();
		table
			.integer(QuestionsCategoriesColumnName.QUESTION_ID)
			.notNullable()
			.references("id")
			.inTable(TableNames.QUESTIONS)
			.onDelete("CASCADE");
		table
			.integer(QuestionsCategoriesColumnName.CATEGORY_ID)
			.notNullable()
			.references("id")
			.inTable(TableNames.PLAN_CATEGORIES)
			.onDelete("CASCADE");
		table
			.dateTime(QuestionsCategoriesColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(QuestionsCategoriesColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());

		table.unique([
			QuestionsCategoriesColumnName.QUESTION_ID,
			QuestionsCategoriesColumnName.CATEGORY_ID,
		]);
	});

	await knex.schema.alterTable(TableNames.PLAN_CATEGORIES, (table) => {
		table.string(CategoriesColumnName.SLUG).notNullable();
	});
}

export { down, up };
