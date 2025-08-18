import { type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { PlanDayModel } from "../plan-days/plan-day.model.js";

class PlanModel extends AbstractModel {
	static get relationMappings(): RelationMappings {
		return {
			days: {
				join: {
					from: "plans.id",
					to: "plan_days.plan_id",
				},
				modelClass: PlanDayModel,
				relation: AbstractModel.HasManyRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.PLANS;
	}

	public duration!: number;

	public intensity!: string;

	public quizId!: number;

	public title!: string;

	public userId!: number;
}

export { PlanModel };
