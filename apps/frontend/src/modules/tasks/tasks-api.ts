import { APIPath, ContentType, HTTPRequestMethod } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import {
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

	public async delete(id: number): Promise<void> {
		await this.load(
			this.getFullEndpoint(TasksApiPath.TASK_DELETE, { id: String(id) }),
			{
				contentType: ContentType.JSON,
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
			this.getFullEndpoint(TasksApiPath.TASK_UPDATE, { id: String(id) }),
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
