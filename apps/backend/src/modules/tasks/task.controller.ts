import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type TaskService } from "~/modules/tasks/task.service.js";
import {
	taskCreateValidationSchema,
	type TaskRequestDto,
} from "~/modules/tasks/tasks.js";

import { TasksApiPath } from "./libs/enums/enums.js";

class TaskController extends BaseController {
	private taskService: TaskService;

	public constructor(logger: Logger, taskService: TaskService) {
		super(logger, APIPath.TASKS);

		this.taskService = taskService;

		this.addRoute({
			handler: (options) =>
				this.findById(options as APIHandlerOptions<{ params: { id: number } }>),
			method: "GET",
			path: TasksApiPath.TASK,
		});

		this.addRoute({
			handler: (options) =>
				this.create(
					options as APIHandlerOptions<{
						body: TaskRequestDto;
					}>,
				),
			method: "POST",
			path: TasksApiPath.TASK_CREATE,
			validation: {
				body: taskCreateValidationSchema,
			},
		});
	}

	private async create(
		options: APIHandlerOptions<{ body: TaskRequestDto }>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.taskService.create(options.body),
			status: HTTPCode.OK,
		};
	}

	private async findById(
		options: APIHandlerOptions<{ params: { id: number } }>,
	): Promise<APIHandlerResponse> {
		const { id } = options.params;

		return {
			payload: await this.taskService.findById(id),
			status: HTTPCode.OK,
		};
	}
}

export { TaskController };
