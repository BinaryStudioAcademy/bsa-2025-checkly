import { type Transaction } from "objection";

import { type Repository } from "~/libs/types/types.js";
import { PlanDayEntity } from "~/modules/plan-days/plan-day.entity.js";
import { type PlanDayRepository } from "~/modules/plan-days/plan-day.repository.js";
import { PlanEntity } from "~/modules/plans/plan.entity.js";
import { type PlanModel } from "~/modules/plans/plan.model.js";
import { TaskEntity } from "~/modules/tasks/task.entity.js";
import { type TaskRepository } from "~/modules/tasks/task.repository.js";

import {
	type GeneratedPlanDTO,
	type SearchProperties,
} from "./libs/types/types.js";

class PlanRepository implements Repository {
	private planDayRepository: PlanDayRepository;
	private planModel: typeof PlanModel;
	private taskRepository: TaskRepository;

	public constructor(
		planModel: typeof PlanModel,
		planDayRepo: PlanDayRepository,
		taskRepo: TaskRepository,
	) {
		this.planModel = planModel;
		this.planDayRepository = planDayRepo;
		this.taskRepository = taskRepo;
	}

	public async create(
		entity: PlanEntity,
		trx?: Transaction,
	): Promise<PlanEntity> {
		const { categoryId, duration, intensity, quizId, styleId, title, userId } =
			entity.toNewObject();

		const plan = await this.planModel
			.query(trx)
			.insert({
				categoryId,
				duration,
				intensity,
				quizId,
				styleId,
				title,
				userId,
			})
			.returning("*")
			.execute();

		return PlanEntity.initialize(plan);
	}

	public async delete(id: number, trx?: Transaction): Promise<boolean> {
		const deletedPlan = await this.planModel.query(trx).deleteById(id);

		return Boolean(deletedPlan);
	}

	public async find(id: number): Promise<null | PlanEntity> {
		const plan = await this.planModel
			.query()
			.findById(id)
			.withGraphFetched("days.tasks");

		return plan ? PlanEntity.initialize(plan) : null;
	}

	public async findActive(id: number): Promise<null | PlanEntity> {
		const plan = await this.planModel.query().findOne({ id });

		return plan ? PlanEntity.initialize(plan) : null;
	}

	public async findActiveByUserId(userId: number): Promise<null | PlanEntity> {
		const plan = await this.planModel
			.query()
			.where({ userId })
			.orderBy("updated_at", "desc")
			.withGraphFetched("days(orderByDayNumber).[tasks(orderByTaskOrder)]")
			.modifiers({
				orderByDayNumber(builder) {
					builder.orderBy("dayNumber", "asc");
				},
				orderByTaskOrder(builder) {
					builder.orderBy("order", "asc");
				},
			})
			.first();

		return plan ? PlanEntity.initialize(plan) : null;
	}

	public async findAll(): Promise<PlanEntity[]> {
		const plans = await this.planModel.query().execute();

		return plans.map((plan) => PlanEntity.initialize(plan));
	}

	public async findAllUserPlans(userId: number): Promise<PlanEntity[]> {
		return await this.planModel
			.query()
			.where({ userId })
			.withGraphFetched("days(orderByDayNumber).tasks(orderByOrder)")
			.withGraphFetched("category")
			.orderBy("updated_at", "desc")
			.then((plans) => plans.map((plan) => PlanEntity.initialize(plan)));
	}

	public async findWithRelations(id: number): Promise<null | PlanEntity> {
		const plan = await this.planModel
			.query()
			.findById(id)
			.withGraphFetched("days(orderByDayNumber).tasks(orderByOrder)");

		return plan ? PlanEntity.initialize(plan) : null;
	}

	public async regenerate(
		planId: number,
		plan: GeneratedPlanDTO,
	): Promise<void> {
		await this.planModel.transaction(async (trx) => {
			const { days, duration, intensity, title } = plan;

			const payload = { duration, intensity, title };
			await this.update(planId, payload);

			await this.taskRepository.deleteByPlanId(planId, trx);
			await this.planDayRepository.deleteByPlanId(planId, trx);

			await this.saveDaysAndTasks(planId, days, trx);
		});
	}

	public async saveGeneratedPlan({
		categoryId,
		plan,
		quizId,
		styleId,
		userId,
	}: {
		categoryId: number;
		plan: GeneratedPlanDTO;
		quizId: number;
		styleId: number;
		userId: null | number;
	}): Promise<number> {
		return await this.planModel.transaction(async (trx) => {
			const { days, duration, intensity, title } = plan;

			const planEntity = PlanEntity.initializeNew({
				categoryId,
				duration,
				intensity,
				quizId,
				styleId,
				title,
				userId,
			});

			const createdPlan = await this.create(planEntity);
			const { id: planId } = createdPlan.toObject();

			await this.saveDaysAndTasks(planId, days, trx);

			return planId;
		});
	}

	public async search({
		categoryId,
		title,
		userId,
	}: SearchProperties): Promise<PlanEntity[]> {
		let query = this.planModel
			.query()
			.where({ userId })
			.withGraphFetched("days.tasks")
			.withGraphFetched("category");

		if (title) {
			query = query.whereILike("title", `%${title}%`);
		}

		if (categoryId) {
			query = query.where({ categoryId });
		}

		const foundPlans = await query;

		return foundPlans.map((plan) => PlanEntity.initialize(plan));
	}

	public async update(
		id: number,
		payload: Partial<PlanModel>,
		trx?: Transaction,
	): Promise<null | PlanEntity> {
		const updatedPlan = await this.planModel
			.query(trx)
			.patchAndFetchById(id, payload);

		return PlanEntity.initialize(updatedPlan);
	}

	public async updateStyle(
		userId: number,
		planId: number,
		styleId: number,
	): Promise<null | PlanEntity> {
		const updatedPlan = await this.planModel
			.query()
			.where({ id: planId, userId })
			.patch({ styleId })
			.returning("*")
			.first();

		return updatedPlan ? PlanEntity.initialize(updatedPlan) : null;
	}

	private async saveDaysAndTasks(
		planId: number,
		days: GeneratedPlanDTO["days"],
		trx: Transaction,
	): Promise<void> {
		const dayEntities = days.map((day) =>
			PlanDayEntity.initializeNew({
				dayNumber: day.dayNumber,
				planId,
			}).toNewObject(),
		);

		const insertedDays = await this.planDayRepository.bulkCreate(
			dayEntities,
			trx,
		);

		const taskEntities = insertedDays.flatMap((day, index) => {
			const { id: planDayId } = day.toObject();
			const relatedDay = days[index];

			return (
				relatedDay?.tasks.map((task) =>
					TaskEntity.initializeNew({
						executionTimeType: task.executionTimeType,
						order: task.order,
						planDayId,
						title: task.title,
					}).toNewObject(),
				) ?? []
			);
		});

		await this.taskRepository.bulkCreate(taskEntities, trx);
	}
}

export { PlanRepository };
