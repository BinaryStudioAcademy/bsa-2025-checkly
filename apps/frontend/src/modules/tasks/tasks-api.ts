import { APIPath, ContentType, HTTPRequestMethod } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import {
	getIdParameter,
	type TaskCreateRequestDto,
	type TaskDto,
	TasksApiPath,
	type TaskUpdateRequestDto,
} from "~/modules/tasks/tasks.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class TaskApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.TASKS, storage });
	}

	public async bulkUpdate(payload: Partial<TaskDto>[]): Promise<TaskDto[]> {
		const response = await this.load(
			this.getFullEndpoint(TasksApiPath.TASKS_UPDATE, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: HTTPRequestMethod.PATCH,
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<TaskDto[]>();
	}

	public async create(payload: TaskCreateRequestDto): Promise<TaskDto> {
		const response = await this.load(
			this.getFullEndpoint(TasksApiPath.TASK_CREATE, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: HTTPRequestMethod.POST,
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<TaskDto>();
	}

	public async delete(id: number): Promise<void> {
		await this.load(
			this.getFullEndpoint(TasksApiPath.TASK_DELETE, getIdParameter(id)),
			{
				hasAuth: true,
				method: HTTPRequestMethod.DELETE,
			},
		);
	}

	public async update(
		id: number,
		payload: TaskUpdateRequestDto,
	): Promise<TaskDto> {
		const response = await this.load(
			this.getFullEndpoint(TasksApiPath.TASK_UPDATE, getIdParameter(id)),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: HTTPRequestMethod.PATCH,
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<TaskDto>();
	}
}

export { TaskApi };
