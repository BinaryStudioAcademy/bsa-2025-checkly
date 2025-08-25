import { type Transaction } from "objection";

import { type Repository } from "~/libs/types/types.js";
import { TaskEntity } from "~/modules/tasks/task.entity.js";
import { type TaskModel } from "~/modules/tasks/task.model.js";

class TaskRepository implements Repository {
	private taskModel: typeof TaskModel;
	public constructor(taskModel: typeof TaskModel) {
		this.taskModel = taskModel;
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

	public async find(id: number): Promise<null | TaskEntity> {
		const task = await this.taskModel.query().findById(id);

		return task ? TaskEntity.initialize(task) : null;
	}

	public async findAll(): Promise<TaskEntity[]> {
		const tasks = await this.taskModel.query().execute();

		return tasks.map((task) => TaskEntity.initialize(task));
	}

	public async update(
		id: number,
		payload: Partial<TaskModel>,
	): Promise<null | TaskEntity> {
		const updatedTask = await this.taskModel
			.query()
			.patchAndFetchById(id, payload);

		return updatedTask ? TaskEntity.initialize(updatedTask) : null;
	}
}

export { TaskRepository };
