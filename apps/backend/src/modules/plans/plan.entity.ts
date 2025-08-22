import { type ExecutionTimeType } from "~/libs/enums/enums.js";
import { type Entity, type ValueOf } from "~/libs/types/types.js";
import {
	type PlanCategoryDto,
	type PlanDayDto,
	type PlanDaysTaskDto,
	type PlanWithCategoryDto,
} from "~/modules/plans/plans.js";

class PlanEntity implements Entity {
	private category?: PlanCategoryDto;

	private categoryId: number;

	private days: PlanDayDto[];

	private duration: number;

	private id: null | number;

	private intensity: string;

	private quizId: number;

	private title: string;

	private userId: number;

	private constructor({
		category,
		categoryId,
		days = [],
		duration,
		id,
		intensity,
		quizId,
		title,
		userId,
	}: {
		category?: PlanCategoryDto;
		categoryId: number;
		days?: PlanDayDto[];
		duration: number;
		id: null | number;
		intensity: string;
		quizId: number;
		title: string;
		userId: number;
	}) {
		this.id = id;
		this.title = title;
		this.userId = userId;
		this.duration = duration;
		this.intensity = intensity;
		this.days = days;
		this.quizId = quizId;
		this.categoryId = categoryId;
		this.category = category;
	}

	public static initialize({
		category,
		categoryId,
		days = [],
		duration,
		id,
		intensity,
		quizId,
		title,
		userId,
	}: {
		category?: PlanCategoryDto;
		categoryId: number;
		days?: PlanDayDto[];
		duration: number;
		id: number;
		intensity: string;
		quizId: number;
		title: string;
		userId: number;
	}): PlanEntity {
		return new PlanEntity({
			category,
			categoryId,
			days,
			duration,
			id,
			intensity,
			quizId,
			title,
			userId,
		});
	}

	public static initializeNew({
		categoryId,
		duration,
		intensity,
		quizId,
		title,
		userId,
	}: {
		categoryId: number;
		duration: number;
		intensity: string;
		quizId: number;
		title: string;
		userId: number;
	}): PlanEntity {
		return new PlanEntity({
			categoryId,
			days: [],
			duration,
			id: null,
			intensity,
			quizId,
			title,
			userId,
		});
	}

	public toNewObject(): {
		categoryId: number;
		duration: number;
		intensity: string;
		quizId: number;
		title: string;
		userId: number;
	} {
		return {
			categoryId: this.categoryId,
			duration: this.duration,
			intensity: this.intensity,
			quizId: this.quizId,
			title: this.title,
			userId: this.userId,
		};
	}

	public toObject(): {
		categoryId: number;
		duration: number;
		id: number;
		intensity: string;
		quizId: number;
		title: string;
		userId: number;
	} {
		return {
			categoryId: this.categoryId,
			duration: this.duration,
			id: this.id as number,
			intensity: this.intensity,
			quizId: this.quizId,
			title: this.title,
			userId: this.userId,
		};
	}

	public toObjectWithCategory(): PlanWithCategoryDto {
		return {
			...this.toObjectWithRelations(),
			category: this.category,
		};
	}

	public toObjectWithRelations(): PlanDaysTaskDto {
		return {
			...this.toObject(),
			days: this.days.map((day) => ({
				dayNumber: day.dayNumber,
				id: day.id,
				planId: day.planId,
				tasks: day.tasks.map((task) => ({
					completedAt: task.completedAt,
					description: task.description,
					executionTimeType: task.executionTimeType as null | ValueOf<
						typeof ExecutionTimeType
					>,
					id: task.id,
					isCompleted: task.isCompleted,
					order: task.order,
					planDayId: task.planDayId,
					title: task.title,
				})),
			})),
		};
	}
}

export { PlanEntity };
