import { type Entity, type ValueOf } from "~/libs/types/types.js";

import { type ExecutionTimeType } from "./libs/enums/enums.js";

class TaskEntity implements Entity {
	private completedAt: null | string;

	private executionTimeType: null | ValueOf<typeof ExecutionTimeType>;

	private id: null | number;

	private isCompleted: boolean;

	private order: number;

	private planDayId: number;

	private title: string;

	private constructor({
		completedAt,
		executionTimeType,
		id,
		isCompleted,
		order,
		planDayId,
		title,
	}: {
		completedAt: null | string;
		executionTimeType: null | ValueOf<typeof ExecutionTimeType>;
		id: null | number;
		isCompleted: boolean;
		order: number;
		planDayId: number;
		title: string;
	}) {
		this.id = id;
		this.title = title;
		this.order = order;
		this.planDayId = planDayId;
		this.isCompleted = isCompleted;
		this.executionTimeType = executionTimeType;
		this.completedAt = completedAt;
	}

	public static initialize({
		completedAt,
		executionTimeType,
		id,
		isCompleted,
		order,
		planDayId,
		title,
	}: {
		completedAt: null | string;
		executionTimeType: null | ValueOf<typeof ExecutionTimeType>;
		id: number;
		isCompleted: boolean;
		order: number;
		planDayId: number;
		title: string;
	}): TaskEntity {
		return new TaskEntity({
			completedAt,
			executionTimeType,
			id,
			isCompleted,
			order,
			planDayId,
			title,
		});
	}

	public static initializeNew({
		completedAt,
		executionTimeType,
		isCompleted,
		order,
		planDayId,
		title,
	}: {
		completedAt?: null | string;
		executionTimeType?: null | ValueOf<typeof ExecutionTimeType>;
		isCompleted?: boolean;
		order: number;
		planDayId: number;
		title: string;
	}): TaskEntity {
		return new TaskEntity({
			completedAt: completedAt ?? null,
			executionTimeType: executionTimeType ?? null,
			id: null,
			isCompleted: isCompleted ?? false,
			order,
			planDayId,
			title,
		});
	}

	public toNewObject(): {
		executionTimeType: null | ValueOf<typeof ExecutionTimeType>;
		isCompleted: boolean;
		order: number;
		planDayId: number;
		title: string;
	} {
		return {
			executionTimeType: this.executionTimeType,
			isCompleted: this.isCompleted,
			order: this.order,
			planDayId: this.planDayId,
			title: this.title,
		};
	}

	public toObject(): {
		completedAt: null | string;
		executionTimeType: null | ValueOf<typeof ExecutionTimeType>;
		id: number;
		isCompleted: boolean;
		order: number;
		planDayId: number;
		title: string;
	} {
		return {
			completedAt: this.completedAt,
			executionTimeType: this.executionTimeType,
			id: this.id as number,
			isCompleted: this.isCompleted,
			order: this.order,
			planDayId: this.planDayId,
			title: this.title,
		};
	}
}

export { TaskEntity };
