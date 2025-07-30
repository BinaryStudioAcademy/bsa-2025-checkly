import { type Repository, type Service } from "~/libs/types/types.js";
import { TaskEntity } from "~/modules/tasks/task.entity.js";
import { type TaskRepository } from "~/modules/tasks/task.repository.js";

import {
	type TaskGetAllResponseDto,
	type TaskRequestDto,
	type TaskResponseDto,
} from "./libs/types/types.js";

class TaskService implements Service {
	private taskRepository: TaskRepository;

	public constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	public async create(payload: TaskRequestDto): Promise<TaskResponseDto> {
		const item = await this.taskRepository.create(
			TaskEntity.initializeNew(payload),
		);

		return item.toObject();
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<TaskGetAllResponseDto> {
		const items = await this.taskRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public async findById(id: number): Promise<null | TaskResponseDto> {
		const item = await this.taskRepository.findById(id);

		return item ? item.toObject() : null;
	}

	public update(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}
}

export { TaskService };
