import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
	type IdParameter,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPRequestMethod } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type TaskService } from "~/modules/tasks/task.service.js";
import {
	type TaskCreateRequestDto,
	taskCreateValidationSchema,
} from "~/modules/tasks/tasks.js";

import { TasksApiPath } from "./libs/enums/enums.js";

class TaskController extends BaseController {
	private taskService: TaskService;

	public constructor(logger: Logger, taskService: TaskService) {
		super(logger, APIPath.TASKS);

		this.taskService = taskService;

		this.addRoute({
			handler: (options) =>
				this.findById(options as APIHandlerOptions<{ params: IdParameter }>),
			method: HTTPRequestMethod.GET,
			path: TasksApiPath.TASK,
		});

		this.addRoute({
			handler: (options) =>
				this.create(
					options as APIHandlerOptions<{
						body: TaskCreateRequestDto;
					}>,
				),
			method: HTTPRequestMethod.POST,
			path: TasksApiPath.TASK_CREATE,
			validation: {
				body: taskCreateValidationSchema,
			},
		});
	}

	private async create(
		options: APIHandlerOptions<{ body: TaskCreateRequestDto }>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.taskService.create(options.body),
			status: HTTPCode.OK,
		};
	}

	private async findById(
		options: APIHandlerOptions<{ params: IdParameter }>,
	): Promise<APIHandlerResponse> {
		const { id } = options.params;

		return {
			payload: await this.taskService.findById(id),
			status: HTTPCode.OK,
		};
	}
}

export { TaskController };
