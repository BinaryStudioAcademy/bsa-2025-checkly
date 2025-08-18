import { type Entity } from "~/libs/types/types.js";
import { type TaskDto } from "~/modules/plan-days/plan-days.js";

import { type PlanDayDto } from "./libs/types/types.js";

class PlanDayEntity implements Entity {
	private dayNumber: number;

	private id: null | number;

	private planId: number;

	private tasks: TaskDto[];

	private constructor({
		dayNumber,
		id,
		planId,
		tasks = [],
	}: {
		dayNumber: number;
		id: null | number;
		planId: number;
		tasks?: TaskDto[];
	}) {
		this.id = id;
		this.dayNumber = dayNumber;
		this.planId = planId;
		this.tasks = tasks;
	}

	public static initialize({
		dayNumber,
		id,
		planId,
		tasks = [],
	}: {
		dayNumber: number;
		id: number;
		planId: number;
		tasks?: TaskDto[];
	}): PlanDayEntity {
		return new PlanDayEntity({
			dayNumber,
			id,
			planId,
			tasks,
		});
	}

	public static initializeNew({
		dayNumber,
		planId,
	}: {
		dayNumber: number;
		planId: number;
	}): PlanDayEntity {
		return new PlanDayEntity({
			dayNumber,
			id: null,
			planId,
		});
	}

	public toNewObject(): {
		dayNumber: number;
		planId: number;
	} {
		return {
			dayNumber: this.dayNumber,
			planId: this.planId,
		};
	}

	public toObject(): {
		dayNumber: number;
		id: number;
		planId: number;
	} {
		return {
			dayNumber: this.dayNumber,
			id: this.id as number,
			planId: this.planId,
		};
	}

	public toObjectWithRelations(): PlanDayDto {
		return {
			...this.toObject(),
			tasks: this.tasks.map((task) => ({
				completedAt: task.completedAt,
				description: task.description,
				executionTimeType: task.executionTimeType,
				id: task.id,
				isCompleted: task.isCompleted,
				order: task.order,
				planDayId: task.planDayId,
				title: task.title,
			})),
		};
	}
}

export { PlanDayEntity };
