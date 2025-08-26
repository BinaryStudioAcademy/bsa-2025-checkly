import { type Knex } from "knex";

async function down(knex: Knex): Promise<void> {
	await knex.raw(
		"DROP TRIGGER IF EXISTS trg_update_plan_day_timestamp ON tasks;",
	);
	await knex.raw(
		"DROP TRIGGER IF EXISTS trg_update_plan_timestamp ON plan_days;",
	);

	await knex.raw("DROP FUNCTION IF EXISTS update_plan_day_timestamp();");
	await knex.raw("DROP FUNCTION IF EXISTS update_plan_timestamp();");
}

async function up(knex: Knex): Promise<void> {
	await knex.raw(`
		CREATE OR REPLACE FUNCTION update_plan_day_timestamp()
		RETURNS TRIGGER AS $$
		BEGIN
			IF TG_OP = 'DELETE' THEN
				UPDATE plan_days
				SET updated_at = NOW()
				WHERE id = OLD.plan_day_id;
			ELSE
				UPDATE plan_days
				SET updated_at = NOW()
				WHERE id = NEW.plan_day_id;
			END IF;
			RETURN NULL;
		END;
		$$ LANGUAGE plpgsql;
	`);

	await knex.raw(`
		CREATE TRIGGER trg_update_plan_day_timestamp
		AFTER INSERT OR UPDATE ON tasks
		FOR EACH ROW
		EXECUTE FUNCTION update_plan_day_timestamp();
	`);

	await knex.raw(`
		CREATE OR REPLACE FUNCTION update_plan_timestamp()
		RETURNS TRIGGER AS $$
		BEGIN
			IF TG_OP = 'DELETE' THEN
				UPDATE plans
				SET updated_at = NOW()
				WHERE id = OLD.plan_id;
			ELSE
				UPDATE plans
				SET updated_at = NOW()
				WHERE id = NEW.plan_id;
			END IF;
			RETURN NULL;
		END;
		$$ LANGUAGE plpgsql;
	`);

	await knex.raw(`
		CREATE TRIGGER trg_update_plan_timestamp
		AFTER INSERT OR UPDATE ON plan_days
		FOR EACH ROW
		EXECUTE FUNCTION update_plan_timestamp();
	`);
}

export { down, up };
