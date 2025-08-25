import { type Transaction } from "objection";

import { type Repository, type ValueOf } from "~/libs/types/types.js";
import { PlanDayEntity } from "~/modules/plan-days/plan-day.entity.js";
import { type PlanDayRepository } from "~/modules/plan-days/plan-day.repository.js";
import { PlanEntity } from "~/modules/plans/plan.entity.js";
import { type PlanModel } from "~/modules/plans/plan.model.js";
import { TaskEntity } from "~/modules/tasks/task.entity.js";
import { type TaskRepository } from "~/modules/tasks/task.repository.js";

import { type ExecutionTimeType } from "./libs/enums/enums.js";
import { type SearchProperties } from "./libs/types/types.js";

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
		const { categoryId, duration, intensity, quizId, title, userId } =
			entity.toNewObject();

		const plan = await this.planModel
			.query(trx)
			.insert({
				categoryId,
				duration,
				intensity,
				quizId,
				title,
				userId,
			})
			.returning("*")
			.execute();

		return PlanEntity.initialize(plan);
	}

	public async delete(id: number): Promise<boolean> {
		const deletedPlan = await this.planModel.query().deleteById(id);

		return Boolean(deletedPlan);
	}

	public async find(id: number): Promise<null | PlanEntity> {
		const plan = await this.planModel.query().findById(id);

		return plan ? PlanEntity.initialize(plan) : null;
	}

	public async findActive(id: number): Promise<null | PlanEntity> {
		const plan = await this.planModel.query().findOne({ id });

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
			.withGraphFetched("days.tasks")
			.withGraphFetched("category")
			.then((plans) => plans.map((plan) => PlanEntity.initialize(plan)));
	}

	public async findWithRelations(id: number): Promise<null | PlanEntity> {
		const plan = await this.planModel
			.query()
			.findById(id)
			.withGraphFetched("days.tasks");

		return plan ? PlanEntity.initialize(plan) : null;
	}

	public async regenerate(plan: PlanEntity): Promise<null | number> {
		return await this.planModel.transaction(async (trx) => {
			const createdPlan = await this.create(plan, trx);
			const planId = createdPlan.toObject().id;

			for (const day of plan.toObjectWithRelations().days) {
				const planDayEntity = PlanDayEntity.initializeNew({
					dayNumber: day.dayNumber,
					planId,
				});

				const createdDay = await this.planDayRepository.create(
					planDayEntity,
					trx,
				);

				const planDayId = createdDay.toObject().id;

				for (const task of day.tasks) {
					const taskEntity = TaskEntity.initializeNew({
						completedAt: task.completedAt,
						description: task.description,
						executionTimeType: task.executionTimeType as null | ValueOf<
							typeof ExecutionTimeType
						>,
						isCompleted: task.isCompleted,
						order: task.order,
						planDayId,
						title: task.title,
					});

					await this.taskRepository.create(taskEntity, trx);
				}
			}

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
	): Promise<null | PlanEntity> {
		const updatedPlan = await this.planModel
			.query()
			.patchAndFetchById(id, payload);

		return PlanEntity.initialize(updatedPlan);
	}
}

export { PlanRepository };
