import { type Knex } from "knex";

const TABLE_NAMES = {
	PLAN_CATEGORIES: "plan_categories",
	PLANS: "plans",
};

const PlanColumnName = {
	CATEGORY_ID: "category_id",
};

const CategoriesColumnName = {
	CREATED_AT: "created_at",
	ID: "id",
	TITLE: "title",
	UPDATED_AT: "updated_at",
};

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable(TABLE_NAMES.PLAN_CATEGORIES);

	await knex.schema.alterTable(TABLE_NAMES.PLANS, (table) => {
		table.dropColumn(PlanColumnName.CATEGORY_ID);
	});
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE_NAMES.PLAN_CATEGORIES, (table) => {
		table.increments(CategoriesColumnName.ID).primary();
		table.string(CategoriesColumnName.TITLE).notNullable();
		table
			.dateTime(CategoriesColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(CategoriesColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
	});

	await knex.schema.alterTable(TABLE_NAMES.PLANS, (table) => {
		table
			.integer(PlanColumnName.CATEGORY_ID)
			.references(CategoriesColumnName.ID)
			.inTable(TABLE_NAMES.PLAN_CATEGORIES);
	});
}

export { down, up };
