import { type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type ValueOf } from "~/libs/types/types.js";

import { PlanDayModel } from "../plan-days/plan-day.model.js";
import { type ExecutionTimeType } from "./libs/enums/enums.js";

class TaskModel extends AbstractModel {
	public static override get relationMappings(): RelationMappings {
		return {
			planDay: {
				join: {
					from: `${DatabaseTableName.TASKS}.planDayId`,
					to: `${DatabaseTableName.PLAN_DAYS}.id`,
				},
				modelClass: PlanDayModel,
				relation: AbstractModel.BelongsToOneRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.TASKS;
	}

	public completedAt!: null | string;

	public description!: string;

	public executionTimeType!: null | ValueOf<typeof ExecutionTimeType>;

	public isCompleted!: boolean;

	public order!: number;

	public planDayId!: number;

	public title!: string;
}

export { TaskModel };
