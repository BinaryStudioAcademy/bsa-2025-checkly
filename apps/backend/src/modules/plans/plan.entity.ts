import { type Entity } from "~/libs/types/types.js";
import {
	type PlanDayDto,
	type PlanDaysTaskDto,
} from "~/modules/plans/plans.js";

class PlanEntity implements Entity {
	private days: PlanDayDto[];

	private duration: string;

	private id: null | number;

	private intensity: string;

	private isActive: boolean;

	private parentPlanId: null | number;

	private title: string;

	private userId: number;

	private constructor({
		days = [],
		duration,
		id,
		intensity,
		isActive,
		parentPlanId,
		title,
		userId,
	}: {
		days?: PlanDayDto[];
		duration: string;
		id: null | number;
		intensity: string;
		isActive: boolean;
		parentPlanId: null | number;
		title: string;
		userId: number;
	}) {
		this.id = id;
		this.title = title;
		this.userId = userId;
		this.duration = duration;
		this.intensity = intensity;
		this.parentPlanId = parentPlanId;
		this.isActive = isActive;
		this.days = days;
	}

	public static initialize({
		days = [],
		duration,
		id,
		intensity,
		isActive,
		parentPlanId,
		title,
		userId,
	}: {
		days?: PlanDayDto[];
		duration: string;
		id: number;
		intensity: string;
		isActive: boolean;
		parentPlanId: null | number;
		title: string;
		userId: number;
	}): PlanEntity {
		return new PlanEntity({
			days,
			duration,
			id,
			intensity,
			isActive,
			parentPlanId,
			title,
			userId,
		});
	}

	public static initializeNew({
		duration,
		intensity,
		isActive = true,
		parentPlanId = null,
		title,
		userId,
	}: {
		duration: string;
		intensity: string;
		isActive?: boolean;
		parentPlanId?: null | number;
		title: string;
		userId: number;
	}): PlanEntity {
		return new PlanEntity({
			days: [],
			duration,
			id: null,
			intensity,
			isActive,
			parentPlanId,
			title,
			userId,
		});
	}

	public toNewObject(): {
		duration: string;
		intensity: string;
		isActive: boolean;
		parentPlanId: null | number;
		title: string;
		userId: number;
	} {
		return {
			duration: this.duration,
			intensity: this.intensity,
			isActive: this.isActive,
			parentPlanId: this.parentPlanId,
			title: this.title,
			userId: this.userId,
		};
	}

	public toObject(): {
		duration: string;
		id: number;
		intensity: string;
		isActive: boolean;
		parentPlanId: null | number;
		title: string;
		userId: number;
	} {
		return {
			duration: this.duration,
			id: this.id as number,
			intensity: this.intensity,
			isActive: this.isActive,
			parentPlanId: this.parentPlanId,
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
				isRegenerated: day.isRegenerated,
				tasks: day.tasks.map((task) => ({
					completedAt: task.completedAt,
					description: task.description,
					executionTimeType: task.executionTimeType,
					id: task.id,
					isCompleted: task.isCompleted,
					isCustom: task.isCustom,
					order: task.order,
					parentTaskId: task.parentTaskId,
					title: task.title,
				})),
			})),
		};
	}
}

export { PlanEntity };
