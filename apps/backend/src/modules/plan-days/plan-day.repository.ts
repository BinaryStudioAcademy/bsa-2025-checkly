import { type Transaction } from "objection";

import { type Repository } from "~/libs/types/types.js";
import { PlanDayEntity } from "~/modules/plan-days/plan-day.entity.js";
import { type PlanDayModel } from "~/modules/plan-days/plan-day.model.js";
import { TaskEntity } from "~/modules/tasks/task.entity.js";
import { type TaskRepository } from "~/modules/tasks/task.repository.js";

import { ZERO } from "./libs/constants/constants.js";
import { type GeneratedDayDTO } from "./libs/types/types.js";

class PlanDayRepository implements Repository {
	private planDayModel: typeof PlanDayModel;
	private taskRepository: TaskRepository;

	public constructor(
		planDayModel: typeof PlanDayModel,
		taskRepository: TaskRepository,
	) {
		this.planDayModel = planDayModel;
		this.taskRepository = taskRepository;
	}

	public async bulkCreate(
		entities: Array<ReturnType<PlanDayEntity["toNewObject"]>>,
		trx?: Transaction,
	): Promise<PlanDayEntity[]> {
		if (entities.length === ZERO) {
			return [];
		}

		const insertedPlanDays = await this.planDayModel
			.query(trx)
			.insert(entities)
			.returning("*");

		return insertedPlanDays.map((day) => PlanDayEntity.initialize(day));
	}

	public async create(
		entity: PlanDayEntity,
		trx?: Transaction,
	): Promise<PlanDayEntity> {
		const { dayNumber, planId } = entity.toNewObject();

		const planDays = await this.planDayModel
			.query(trx)
			.insert({
				dayNumber,
				planId,
			})
			.returning("*")
			.execute();

		return PlanDayEntity.initialize(planDays);
	}

	public async delete(id: number): Promise<boolean> {
		const deletedPlanDay = await this.planDayModel.query().deleteById(id);

		return Boolean(deletedPlanDay);
	}

	public async deleteByPlanId(
		planId: number,
		trx?: Transaction,
	): Promise<number> {
		await this.taskRepository.deleteByPlanId(planId, trx);

		const deletedCount = await this.planDayModel
			.query(trx)
			.delete()
			.where({ planId });

		return deletedCount;
	}

	public async find(id: number): Promise<null | PlanDayEntity> {
		const planDay = await this.planDayModel.query().where({ id }).first();

		return planDay ? PlanDayEntity.initialize(planDay) : null;
	}

	public async findAll(): Promise<PlanDayEntity[]> {
		const planDays = await this.planDayModel.query().execute();

		return planDays.map((planDay) => PlanDayEntity.initialize(planDay));
	}

	public async regenerate(
		planDayId: number,
		planDay: GeneratedDayDTO,
	): Promise<void> {
		await this.planDayModel.transaction(async (trx) => {
			const { tasks } = planDay;

			await this.taskRepository.deleteByPlanDayId(planDayId, trx);

			const taskEntities = tasks.map((task) =>
				TaskEntity.initializeNew({
					description: task.description,
					executionTimeType: task.executionTimeType,
					order: task.order,
					planDayId,
					title: task.title,
				}).toNewObject(),
			);

			await this.taskRepository.bulkCreate(taskEntities, trx);
		});
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { PlanDayRepository };
