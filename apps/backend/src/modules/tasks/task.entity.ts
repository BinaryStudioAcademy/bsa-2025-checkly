import { type Entity, type ValueOf } from "~/libs/types/types.js";

import { ExecutionTimeType } from "./libs/enums/enums.js";

class TaskEntity implements Entity {
	private completedAt: null | string;

	private description: string;

	private executionTimeType: ValueOf<typeof ExecutionTimeType>;

	private id: null | number;

	private isCompleted: boolean;

	private isCustom: boolean;

	private order: number;

	private parentTaskId: null | number;

	private planDayId: number;

	private title: string;

	private constructor({
		completedAt,
		description,
		executionTimeType,
		id,
		isCompleted,
		isCustom,
		order,
		parentTaskId,
		planDayId,
		title,
	}: {
		completedAt: null | string;
		description: string;
		executionTimeType: ValueOf<typeof ExecutionTimeType>;
		id: null | number;
		isCompleted: boolean;
		isCustom: boolean;
		order: number;
		parentTaskId: null | number;
		planDayId: number;
		title: string;
	}) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.order = order;
		this.planDayId = planDayId;
		this.isCompleted = isCompleted;
		this.isCustom = isCustom;
		this.parentTaskId = parentTaskId;
		this.executionTimeType = executionTimeType;
		this.completedAt = completedAt;
	}

	public static initialize({
		completedAt,
		description,
		executionTimeType,
		id,
		isCompleted,
		isCustom,
		order,
		parentTaskId,
		planDayId,
		title,
	}: {
		completedAt: null | string;
		description: string;
		executionTimeType: ValueOf<typeof ExecutionTimeType>;
		id: number;
		isCompleted: boolean;
		isCustom: boolean;
		order: number;
		parentTaskId: null | number;
		planDayId: number;
		title: string;
	}): TaskEntity {
		return new TaskEntity({
			completedAt,
			description,
			executionTimeType,
			id,
			isCompleted,
			isCustom,
			order,
			parentTaskId,
			planDayId,
			title,
		});
	}

	public static initializeNew({
		completedAt,
		description,
		executionTimeType,
		isCompleted,
		isCustom,
		order,
		parentTaskId,
		planDayId,
		title,
	}: {
		completedAt?: null | string;
		description: string;
		executionTimeType?: ValueOf<typeof ExecutionTimeType>;
		isCompleted?: boolean;
		isCustom?: boolean;
		order: number;
		parentTaskId?: null | number;
		planDayId: number;
		title: string;
	}): TaskEntity {
		return new TaskEntity({
			completedAt: completedAt ?? null,
			description,
			executionTimeType: executionTimeType ?? ExecutionTimeType.MORNING,
			id: null,
			isCompleted: isCompleted ?? false,
			isCustom: isCustom ?? false,
			order,
			parentTaskId: parentTaskId ?? null,
			planDayId,
			title,
		});
	}

	public toNewObject(): {
		description: string;
		executionTimeType: ValueOf<typeof ExecutionTimeType>;
		isCompleted: boolean;
		isCustom: boolean;
		order: number;
		parentTaskId: null | number;
		planDayId: number;
		title: string;
	} {
		return {
			description: this.description,
			executionTimeType: this.executionTimeType,
			isCompleted: this.isCompleted,
			isCustom: this.isCustom,
			order: this.order,
			parentTaskId: this.parentTaskId,
			planDayId: this.planDayId,
			title: this.title,
		};
	}

	public toObject(): {
		completedAt: null | string;
		description: string;
		executionTimeType: ValueOf<typeof ExecutionTimeType>;
		id: number;
		isCompleted: boolean;
		isCustom: boolean;
		order: number;
		parentTaskId: null | number;
		planDayId: number;
		title: string;
	} {
		return {
			completedAt: this.completedAt,
			description: this.description,
			executionTimeType: this.executionTimeType,
			id: this.id as number,
			isCompleted: this.isCompleted,
			isCustom: this.isCustom,
			order: this.order,
			parentTaskId: this.parentTaskId,
			planDayId: this.planDayId,
			title: this.title,
		};
	}
}

export { TaskEntity };
