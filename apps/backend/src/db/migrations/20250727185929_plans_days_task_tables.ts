import { type Knex } from "knex";

const TableNames = {
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
	TITLE: "title",
	UPDATED_AT: "updated_at",
	USER_ID: "user_id",
} as const;

const PlanDayColumnName = {
	DAY_NUMBER: "day_number",
	ID: "id",
	PLAN_ID: "plan_id",
} as const;

const TaskColumnName = {
	COMPLETED_AT: "completed_at",
	DESCRIPTION: "description",
	EXECUTION_TIME_TYPE: "execution_time_type",
	ID: "id",
	IS_COMPLETED: "is_completed",
	ORDER: "order",
	PLAN_DAY_ID: "plan_day_id",
	TITLE: "title",
	UPDATED_AT: "updated_at",
} as const;

const UserColumnName = {
	ID: "id",
} as const;

const EnumTypeName = {
	EXECUTION_TIME: "execution_time",
};

const EXECUTION_TYPE = ["morning", "afternoon", "evening"];

const ColumnLength = {
	INTENSITY: 50,
	TASK_TITLE: 200,
	TITLE: 100,
} as const;

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TableNames.TASK);
	await knex.schema.dropTableIfExists(TableNames.PLAN_DAY);
	await knex.schema.dropTableIfExists(TableNames.PLAN);

	await knex.raw(`DROP TYPE IF EXISTS "${EnumTypeName.EXECUTION_TIME}"`);
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TableNames.PLAN, (table) => {
		table.increments(PlanColumnName.ID).primary();
		table.string(PlanColumnName.TITLE, ColumnLength.TITLE).notNullable();
		table
			.integer(PlanColumnName.USER_ID)
			.references(UserColumnName.ID)
			.inTable(TableNames.USERS)
			.onDelete("CASCADE");
		table.integer(PlanColumnName.DURATION).notNullable().checkPositive();
		table
			.string(PlanColumnName.INTENSITY, ColumnLength.INTENSITY)
			.notNullable();
		table
			.timestamp(PlanColumnName.CREATED_AT, { useTz: true })
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(PlanColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
	});

	await knex.schema.createTable(TableNames.PLAN_DAY, (table) => {
		table.increments(PlanDayColumnName.ID).primary();
		table.integer(PlanDayColumnName.DAY_NUMBER).notNullable().checkPositive();
		table
			.integer(PlanDayColumnName.PLAN_ID)
			.notNullable()
			.references(PlanColumnName.ID)
			.inTable(TableNames.PLAN)
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

	await knex.schema.createTable(TableNames.TASK, (table) => {
		table.increments(TaskColumnName.ID).primary();
		table.string(TaskColumnName.TITLE, ColumnLength.TASK_TITLE).notNullable();
		table.text(TaskColumnName.DESCRIPTION).notNullable();
		table.integer(TaskColumnName.ORDER).notNullable().checkPositive();
		table
			.integer(TaskColumnName.PLAN_DAY_ID)
			.notNullable()
			.references(PlanDayColumnName.ID)
			.inTable(TableNames.PLAN_DAY)
			.onDelete("CASCADE");
		table.boolean(TaskColumnName.IS_COMPLETED).notNullable().defaultTo(false);
		table.enu(TaskColumnName.EXECUTION_TIME_TYPE, EXECUTION_TYPE, {
			enumName: EnumTypeName.EXECUTION_TIME,
			useNative: true,
		});
		table
			.timestamp(PlanColumnName.CREATED_AT, { useTz: true })
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(PlanColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table.timestamp(TaskColumnName.COMPLETED_AT, { useTz: true });
	});
}

export { down, up };
