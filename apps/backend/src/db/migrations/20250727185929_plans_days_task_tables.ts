import { type Knex } from "knex";

const TABLE_NAMES = {
	PLAN: "plans",
	PLAN_DAY: "plan_days",
	TASK: "tasks",
	USERS: "users",
};

const PlanColumnName = {
	CREATED_AT: "created_at",
	DURATION: "duration",
	ID: "id",
	INTENSITY: "intensity",
	IS_ACTIVE: "is_active",
	PARENT_PLAN_ID: "parent_plan_id",
	TITLE: "title",
	UPDATED_AT: "updated_at",
	USER_ID: "user_id",
} as const;

const PlanDayColumnName = {
	DAY_NUMBER: "day_number",
	ID: "id",
	IS_REGENERATED: "is_regenerated",
	PLAN_ID: "plan_id",
} as const;

const TaskColumnName = {
	COMPLETED_AT: "completed_at",
	DESCRIPTION: "description",
	EXECUTION_TIME_TYPE: "execution_time_type",
	ID: "id",
	IS_COMPLETED: "is_completed",
	IS_CUSTOM: "is_custom",
	ORDER: "order",
	PARENT_TASK_ID: "parent_task_id",
	PLAN_DAY_ID: "plan_day_id",
	TITLE: "title",
	UPDATED_AT: "updated_at",
} as const;

const UserColumnName = {
	ID: "id",
} as const;

const ENUM_TYPE_NAME = {
	EXECUTION_TIME: "execution_time",
};

const EXECUTION_TYPE = ["morning", "afternoon", "evening"];

const COLUMN_LENGTH = {
	DURATION: 50,
	INTENSITY: 50,
	TASK_TITLE: 200,
	TITLE: 100,
} as const;

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TABLE_NAMES.TASK);
	await knex.schema.dropTableIfExists(TABLE_NAMES.PLAN_DAY);
	await knex.schema.dropTableIfExists(TABLE_NAMES.PLAN);

	await knex.raw(`DROP TYPE IF EXISTS "${ENUM_TYPE_NAME.EXECUTION_TIME}"`);
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE_NAMES.PLAN, (table) => {
		table.increments(PlanColumnName.ID).primary();
		table.string(PlanColumnName.TITLE, COLUMN_LENGTH.TITLE).notNullable();
		table
			.integer(PlanColumnName.USER_ID)
			.notNullable()
			.references(UserColumnName.ID)
			.inTable(TABLE_NAMES.USERS)
			.onDelete("CASCADE");
		table.string(PlanColumnName.DURATION, COLUMN_LENGTH.DURATION).notNullable();
		table
			.string(PlanColumnName.INTENSITY, COLUMN_LENGTH.INTENSITY)
			.notNullable();
		table
			.integer(PlanColumnName.PARENT_PLAN_ID)
			.references(PlanColumnName.ID)
			.inTable(TABLE_NAMES.PLAN)
			.onDelete("SET NULL");
		table.boolean(PlanColumnName.IS_ACTIVE).notNullable().defaultTo(true);
		table
			.timestamp(PlanColumnName.CREATED_AT, { useTz: true })
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(PlanColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
	});

	await knex.schema.createTable(TABLE_NAMES.PLAN_DAY, (table) => {
		table.increments(PlanDayColumnName.ID).primary();
		table.integer(PlanDayColumnName.DAY_NUMBER).notNullable().checkPositive();
		table
			.boolean(PlanDayColumnName.IS_REGENERATED)
			.notNullable()
			.defaultTo(false);
		table
			.integer(PlanDayColumnName.PLAN_ID)
			.notNullable()
			.references(PlanColumnName.ID)
			.inTable(TABLE_NAMES.PLAN)
			.onDelete("CASCADE");
		table
			.timestamp(PlanColumnName.CREATED_AT, { useTz: true })
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(PlanColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
	});

	await knex.schema.createTable(TABLE_NAMES.TASK, (table) => {
		table.increments(TaskColumnName.ID).primary();
		table.string(TaskColumnName.TITLE, COLUMN_LENGTH.TASK_TITLE).notNullable();
		table.text(TaskColumnName.DESCRIPTION).notNullable();
		table.integer(TaskColumnName.ORDER).notNullable().checkPositive();
		table
			.integer(TaskColumnName.PLAN_DAY_ID)
			.notNullable()
			.references(PlanDayColumnName.ID)
			.inTable(TABLE_NAMES.PLAN_DAY)
			.onDelete("CASCADE");
		table.boolean(TaskColumnName.IS_COMPLETED).notNullable().defaultTo(false);
		table.boolean(TaskColumnName.IS_CUSTOM).notNullable().defaultTo(false);
		table
			.integer(TaskColumnName.PARENT_TASK_ID)
			.references(TaskColumnName.ID)
			.inTable(TABLE_NAMES.TASK)
			.onDelete("SET NULL");
		table
			.enu(TaskColumnName.EXECUTION_TIME_TYPE, EXECUTION_TYPE, {
				enumName: ENUM_TYPE_NAME.EXECUTION_TIME,
				useNative: true,
			})
			.notNullable()
			.defaultTo("morning");
		table
			.timestamp(PlanColumnName.CREATED_AT, { useTz: true })
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(PlanColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table.timestamp(TaskColumnName.COMPLETED_AT, { useTz: true }).nullable();
	});
}

export { down, up };
