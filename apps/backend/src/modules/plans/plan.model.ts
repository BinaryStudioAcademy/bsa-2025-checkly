import { type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { PlanCategoryModel } from "../plan-categories/plan-category.model.js";
import { PlanDayModel } from "../plan-days/plan-day.model.js";
import { PlanStyleModel } from "../plan-styles/plan-style.model.js";

class PlanModel extends AbstractModel {
	static get relationMappings(): RelationMappings {
		return {
			category: {
				join: {
					from: "plans.category_id",
					to: "plan_categories.id",
				},
				modelClass: PlanCategoryModel,
				relation: AbstractModel.BelongsToOneRelation,
			},
			days: {
				join: {
					from: "plans.id",
					to: "plan_days.plan_id",
				},
				modelClass: PlanDayModel,
				relation: AbstractModel.HasManyRelation,
			},
			style: {
				join: {
					from: "plans.style_id",
					to: "plan_styles.id",
				},
				modelClass: PlanStyleModel,
				relation: AbstractModel.BelongsToOneRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.PLANS;
	}

	public categoryId!: number;

	public duration!: number;

	public intensity!: string;

	public styleId!: number;

	public title!: string;

	public userId!: null | number;
}

export { PlanModel };
