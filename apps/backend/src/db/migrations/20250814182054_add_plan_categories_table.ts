import { type Knex } from "knex";

const TableNames = {
	PLAN_CATEGORIES: "plan_categories",
	PLANS: "plans",
};

const PlanColumnName = {
	CATEGORY_ID: "category_id",
};

const CategoriesColumnName = {
	CREATED_AT: "created_at",
	ICON_HREF: "icon_href",
	ID: "id",
	ORDER: "order",
	TITLE: "title",
	UPDATED_AT: "updated_at",
};

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable(TableNames.PLAN_CATEGORIES);

	await knex.schema.alterTable(TableNames.PLANS, (table) => {
		table.dropColumn(PlanColumnName.CATEGORY_ID);
	});
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TableNames.PLAN_CATEGORIES, (table) => {
		table.increments(CategoriesColumnName.ID).primary();
		table.string(CategoriesColumnName.TITLE).notNullable();
		table.string(CategoriesColumnName.ICON_HREF).notNullable();
		table.integer(CategoriesColumnName.ORDER).unique().notNullable();
		table
			.dateTime(CategoriesColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(CategoriesColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
	});

	await knex.schema.alterTable(TableNames.PLANS, (table) => {
		table
			.integer(PlanColumnName.CATEGORY_ID)
			.references(CategoriesColumnName.ID)
			.inTable(TableNames.PLAN_CATEGORIES);
	});
}

export { down, up };
