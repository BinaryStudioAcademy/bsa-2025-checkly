import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class PlanCategoryModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.PLAN_CATEGORIES;
	}

	public title!: string;
}

export { PlanCategoryModel };
