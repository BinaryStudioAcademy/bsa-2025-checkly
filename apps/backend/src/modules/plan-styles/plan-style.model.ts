import { Model } from "objection";

import { DatabaseTableName } from "~/libs/modules/database/database.js";

class PlanStyleModel extends Model {
	public static get tableName(): string {
		return DatabaseTableName.PLAN_STYLES;
	}

	public createdAt!: string;
	public id!: number;
	public name!: string;
	public updatedAt!: string;
}

export { PlanStyleModel };
