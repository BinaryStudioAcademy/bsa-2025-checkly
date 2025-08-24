import { type Knex } from "knex";

const TABLE_NAMES = {
	PLAN_STYLES: "plan_styles",
	PLANS: "plans",
};

const PlanStyleColumnName = {
	CREATED_AT: "created_at",
	ID: "id",
	NAME: "name",
	UPDATED_AT: "updated_at",
} as const;

const PlanColumnName = {
	STYLE_ID: "style_id",
} as const;

async function down(knex: Knex): Promise<void> {
	const hasStyleIdColumn = await knex.schema.hasColumn(
		TABLE_NAMES.PLANS,
		PlanColumnName.STYLE_ID,
	);

	if (hasStyleIdColumn) {
		await knex.schema.alterTable(TABLE_NAMES.PLANS, (table) => {
			table.dropColumn(PlanColumnName.STYLE_ID);
		});
	}

	await knex.schema.dropTableIfExists(TABLE_NAMES.PLAN_STYLES);
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE_NAMES.PLAN_STYLES, (table) => {
		table.increments(PlanStyleColumnName.ID).primary();
		table.string(PlanStyleColumnName.NAME).notNullable().unique();
		table
			.timestamp(PlanStyleColumnName.CREATED_AT, { useTz: true })
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.timestamp(PlanStyleColumnName.UPDATED_AT, { useTz: true })
			.notNullable()
			.defaultTo(knex.fn.now());
	});

	await knex.schema.alterTable(TABLE_NAMES.PLANS, (table) => {
		table
			.integer(PlanColumnName.STYLE_ID)
			.references(PlanStyleColumnName.ID)
			.inTable(TABLE_NAMES.PLAN_STYLES);
	});
}

export { down, up };
