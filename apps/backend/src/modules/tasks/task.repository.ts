import { type Transaction } from "objection";

import { type Repository } from "~/libs/types/types.js";
import { TaskEntity } from "~/modules/tasks/task.entity.js";
import { type TaskModel } from "~/modules/tasks/task.model.js";

import { ZERO } from "./libs/constants/constants.js";

class TaskRepository implements Repository {
	private taskModel: typeof TaskModel;
	public constructor(taskModel: typeof TaskModel) {
		this.taskModel = taskModel;
	}

	public async bulkCreate(
		entities: Array<ReturnType<TaskEntity["toNewObject"]>>,
		trx?: Transaction,
	): Promise<TaskEntity[]> {
		if (entities.length === ZERO) {
			return [];
		}

		const tasks = await this.taskModel
			.query(trx)
			.insert(entities)
			.returning("*");

		return tasks.map((task) => TaskEntity.initialize(task));
	}

	public async create(
		entity: TaskEntity,
		trx?: Transaction,
	): Promise<TaskEntity> {
		const { executionTimeType, order, planDayId, title } =
			entity.toNewObject();

		const task = await this.taskModel
			.query(trx)
			.insert({
				executionTimeType,
				order,
				planDayId,
				title,
			})
			.returning("*")

		return TaskEntity.initialize(task);
	}

	public async delete(id: number): Promise<boolean> {
		const deletedTask = await this.taskModel.query().deleteById(id);

		return Boolean(deletedTask);
	}

	public async deleteByPlanDayId(
		planDayId: number,
		trx?: Transaction,
	): Promise<number> {
		const deletedCount = await this.taskModel
			.query(trx)
			.delete()
			.where({ planDayId });

		return deletedCount;
	}

	public async deleteByPlanId(
		planId: number,
		trx?: Transaction,
	): Promise<number> {
		const deletedCount = await this.taskModel
			.query(trx)
			.delete()
			.whereIn(
				"planDayId",
				this.taskModel
					.relatedQuery("planDay", trx)
					.select("id")
					.where("planId", planId),
			);

		return deletedCount;
	}

	public async find(id: number): Promise<null | TaskEntity> {
		const task = await this.taskModel.query().findById(id);

		return task ? TaskEntity.initialize(task) : null;
	}

	public async findAll(): Promise<TaskEntity[]> {
		const tasks = await this.taskModel.query().execute();

		return tasks.map((task) => TaskEntity.initialize(task));
	}

	public async regenerate(
		taskId: number,
		task: TaskEntity,
	): Promise<TaskEntity> {
		const { description, executionTimeType, isCompleted, order, title } =
			task.toObject();

		const payload = {
			description,
			executionTimeType,
			isCompleted,
			order,
			title,
		};

		return await this.update(taskId, payload);
	}

	public async update(
		id: number,
		payload: Partial<TaskModel>,
	): Promise<TaskEntity> {
		const updatedTask = await this.taskModel
			.query()
			.patchAndFetchById(id, payload);

		return updatedTask ? TaskEntity.initialize(updatedTask) : null;
	}
}

export { TaskRepository };
