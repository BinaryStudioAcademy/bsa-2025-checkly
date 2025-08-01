import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type ExecutionTimeType } from "./libs/enums/enums.js";

class TaskModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.TASKS;
	}
	public completedAt!: null | string;

	public description!: string;

	public executionTimeType!: ValueOf<typeof ExecutionTimeType>;

	public isCompleted!: boolean;

	public order!: number;

	public planDayId!: number;

	public title!: string;
}

export { TaskModel };
