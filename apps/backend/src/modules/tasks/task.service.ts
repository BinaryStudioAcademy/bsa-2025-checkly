import { type Service } from "~/libs/types/types.js";
import { TaskEntity } from "~/modules/tasks/task.entity.js";
import { type TaskRepository } from "~/modules/tasks/task.repository.js";

import { type TaskDto } from "../plans/libs/types/types.js";
import {
	type TaskCreateRequestDto,
	type TaskGetAllResponseDto,
	type TaskResponseDto,
	type TaskUpdateRequestDto,
} from "./libs/types/types.js";

class TaskService implements Service {
	private taskRepository: TaskRepository;

	public constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	public async bulkUpdate(
		payload: Partial<TaskDto>[],
	): Promise<(null | TaskEntity)[]> {
		const updatedTasks = await Promise.all(
			payload.map((item) =>
				this.taskRepository.update(item.id as number, item),
			),
		);

		return updatedTasks;
	}

	public async create(payload: TaskCreateRequestDto): Promise<TaskResponseDto> {
		const item = await this.taskRepository.create(
			TaskEntity.initializeNew(payload),
		);

		return item.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		return await this.taskRepository.delete(id);
	}

	public async find(id: number): Promise<null | TaskResponseDto> {
		const item = await this.taskRepository.find(id);

		return item ? item.toObject() : null;
	}

	public async findAll(): Promise<TaskGetAllResponseDto> {
		const items = await this.taskRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public async update(
		id: number,
		payload: TaskUpdateRequestDto,
	): Promise<TaskResponseDto> {
		const item = await this.taskRepository.update(id, payload);

		return item.toObject();
	}
}

export { TaskService };
