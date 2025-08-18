import { type Transaction } from "objection";

import { type Repository, type ValueOf } from "~/libs/types/types.js";
import { PlanDayEntity } from "~/modules/plan-days/plan-day.entity.js";
import { type PlanDayModel } from "~/modules/plan-days/plan-day.model.js";
import { TaskEntity } from "~/modules/tasks/task.entity.js";
import { type TaskRepository } from "~/modules/tasks/task.repository.js";

import { type ExecutionTimeType } from "./libs/enums/enums.js";

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

	public async find(id: number): Promise<null | PlanDayEntity> {
		const planDay = await this.planDayModel.query().where({ id }).first();

		return planDay ? PlanDayEntity.initialize(planDay) : null;
	}

	public async findAll(): Promise<PlanDayEntity[]> {
		const planDays = await this.planDayModel.query().execute();

		return planDays.map((planDay) => PlanDayEntity.initialize(planDay));
	}

	public async regenerate(planDay: PlanDayEntity): Promise<null | number> {
		return await this.planDayModel.transaction(async (trx) => {
			const createdPlanDay = await this.create(planDay, trx);
			const planDayId = createdPlanDay.toObject().id;

			for (const task of planDay.toObjectWithRelations().tasks) {
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

			return planDayId;
		});
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { PlanDayRepository };
