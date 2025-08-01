import { type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { PlanModel } from "../plans/plan.model.js";
import { TaskModel } from "../tasks/task.model.js";

class PlanDayModel extends AbstractModel {
	static get relationMappings(): RelationMappings {
		return {
			plan: {
				join: {
					from: "plan_days.plan_id",
					to: "plans.id",
				},
				modelClass: PlanModel,
				relation: AbstractModel.BelongsToOneRelation,
			},
			tasks: {
				join: {
					from: "plan_days.id",
					to: "tasks.plan_day_id",
				},
				modelClass: TaskModel,
				relation: AbstractModel.HasManyRelation,
			},
		};
	}
	public static override get tableName(): string {
		return DatabaseTableName.PLAN_DAYS;
	}

	public dayNumber!: number;

	public planId!: number;
}

export { PlanDayModel };
