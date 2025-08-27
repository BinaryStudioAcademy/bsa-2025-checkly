import { type Entity } from "~/libs/types/types.js";
import {
	type PlanDayDto,
	type PlanDaysTaskDto,
	type PlanWithCategoryDto,
} from "~/modules/plans/plans.js";

import { type PlanCategoryDto, type TaskDto } from "./libs/types/types.js";

class PlanEntity implements Entity {
	private category?: PlanCategoryDto;

	private categoryId: number;

	private createdAt?: string;

	private days: PlanDayDto[];

	private duration: number;

	private id: null | number;

	private intensity: string;

	private quizId: number;

	private styleId: number;

	private title: string;

	private updatedAt?: string;

	private userId: null | number;

	private constructor({
		category,
		categoryId,
		createdAt,
		days = [],
		duration,
		id,
		intensity,
		quizId,
		styleId,
		title,
		updatedAt,
		userId,
	}: {
		category?: PlanCategoryDto;
		categoryId: number;
		createdAt?: string;
		days?: PlanDayDto[];
		duration: number;
		id: null | number;
		intensity: string;
		quizId: number;
		styleId: number;
		title: string;
		updatedAt?: string;
		userId: null | number;
	}) {
		this.id = id;
		this.title = title;
		this.userId = userId;
		this.duration = duration;
		this.intensity = intensity;
		this.quizId = quizId;
		this.days = days;
		this.categoryId = categoryId;
		this.category = category;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.styleId = styleId;
	}

	public static initialize({
		category,
		categoryId,
		createdAt,
		days = [],
		duration,
		id,
		intensity,
		quizId,
		styleId,
		title,
		updatedAt,
		userId,
	}: {
		category?: PlanCategoryDto;
		categoryId: number;
		createdAt?: string;
		days?: PlanDayDto[];
		duration: number;
		id: number;
		intensity: string;
		quizId: number;
		styleId: number;
		title: string;
		updatedAt?: string;
		userId: null | number;
	}): PlanEntity {
		return new PlanEntity({
			category,
			categoryId,
			createdAt,
			days,
			duration,
			id,
			intensity,
			quizId,
			styleId,
			title,
			updatedAt,
			userId,
		});
	}

	public static initializeNew({
		categoryId,
		duration,
		intensity,
		quizId,
		styleId,
		title,
		userId,
	}: {
		categoryId: number;
		duration: number;
		intensity: string;
		quizId: number;
		styleId: number;
		title: string;
		userId: null | number;
	}): PlanEntity {
		return new PlanEntity({
			categoryId,
			createdAt: "",
			days: [],
			duration,
			id: null,
			intensity,
			quizId,
			styleId,
			title,
			updatedAt: "",
			userId,
		});
	}

	public toNewObject(): {
		categoryId: number;
		duration: number;
		intensity: string;
		quizId: number;
		styleId: number;
		title: string;
		userId: null | number;
	} {
		return {
			categoryId: this.categoryId,
			duration: this.duration,
			intensity: this.intensity,
			quizId: this.quizId,
			styleId: this.styleId,
			title: this.title,
			userId: this.userId,
		};
	}

	public toObject(): {
		categoryId: number;
		createdAt?: string;
		duration: number;
		id: number;
		intensity: string;
		quizId: number;
		styleId: number;
		title: string;
		updatedAt?: string;
		userId: null | number;
	} {
		return {
			categoryId: this.categoryId,
			createdAt: this.createdAt,
			duration: this.duration,
			id: this.id as number,
			intensity: this.intensity,
			quizId: this.quizId,
			styleId: this.styleId,
			title: this.title,
			updatedAt: this.updatedAt,
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
				tasks: day.tasks.map((task: TaskDto) => ({
					completedAt: task.completedAt,
					description: task.description,
					executionTimeType: task.executionTimeType,
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
