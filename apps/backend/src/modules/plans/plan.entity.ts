import { type Entity } from "~/libs/types/types.js";
import {
	type PlanDayDto,
	type PlanDaysTaskDto,
} from "~/modules/plans/plans.js";

class PlanEntity implements Entity {
	private days: PlanDayDto[];

	private duration: number;

	private id: null | number;

	private intensity: string;

	private title: string;

	private userId: number;

	private constructor({
		days = [],
		duration,
		id,
		intensity,
		title,
		userId,
	}: {
		days?: PlanDayDto[];
		duration: number;
		id: null | number;
		intensity: string;
		title: string;
		userId: number;
	}) {
		this.id = id;
		this.title = title;
		this.userId = userId;
		this.duration = duration;
		this.intensity = intensity;
		this.days = days;
	}

	public static initialize({
		days = [],
		duration,
		id,
		intensity,
		title,
		userId,
	}: {
		days?: PlanDayDto[];
		duration: number;
		id: number;
		intensity: string;
		title: string;
		userId: number;
	}): PlanEntity {
		return new PlanEntity({
			days,
			duration,
			id,
			intensity,
			title,
			userId,
		});
	}

	public static initializeNew({
		duration,
		intensity,
		title,
		userId,
	}: {
		duration: number;
		intensity: string;
		title: string;
		userId: number;
	}): PlanEntity {
		return new PlanEntity({
			days: [],
			duration,
			id: null,
			intensity,
			title,
			userId,
		});
	}

	public toNewObject(): {
		duration: number;
		intensity: string;
		title: string;
		userId: number;
	} {
		return {
			duration: this.duration,
			intensity: this.intensity,
			title: this.title,
			userId: this.userId,
		};
	}

	public toObject(): {
		duration: number;
		id: number;
		intensity: string;
		title: string;
		userId: number;
	} {
		return {
			duration: this.duration,
			id: this.id as number,
			intensity: this.intensity,
			title: this.title,
			userId: this.userId,
		};
	}

	public toObjectWithRelations(): PlanDaysTaskDto {
		return {
			...this.toObject(),
			days: this.days.map((day) => ({
				dayNumber: day.dayNumber,
				id: day.id,
				tasks: day.tasks.map((task) => ({
					completedAt: task.completedAt,
					description: task.description,
					executionTimeType: task.executionTimeType,
					id: task.id,
					isCompleted: task.isCompleted,
					order: task.order,
					title: task.title,
				})),
			})),
		};
	}
}

export { PlanEntity };
