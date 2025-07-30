import { type Repository } from "~/libs/types/types.js";
import { TaskEntity } from "~/modules/tasks/task.entity.js";
import { type TaskModel } from "~/modules/tasks/task.model.js";

class TaskRepository implements Repository {
	private taskModel: typeof TaskModel;
	public constructor(taskModel: typeof TaskModel) {
		this.taskModel = taskModel;
	}

	public async create(entity: TaskEntity): Promise<TaskEntity> {
		const {
			description,
			executionTimeType,
			isCustom,
			order,
			parentTaskId,
			planDayId,
			title,
		} = entity.toNewObject();

		const task = await this.taskModel
			.query()
			.insert({
				description,
				executionTimeType,
				isCustom,
				order,
				parentTaskId,
				planDayId,
				title,
			})
			.returning("*")
			.execute();

		return TaskEntity.initialize(task);
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<TaskEntity[]> {
		const tasks = await this.taskModel.query().execute();

		return tasks.map((task) => TaskEntity.initialize(task));
	}

	public async findById(id: number): Promise<null | TaskEntity> {
		const task = await this.taskModel.query().where({ id }).first();

		return task ? TaskEntity.initialize(task) : null;
	}

	public update(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}
}

export { TaskRepository };
