import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIBodyOptions,
	type APIHandlerResponse,
	BaseController,
	type IdParametersOption,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPRequestMethod } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type TaskService } from "~/modules/tasks/task.service.js";
import {
	type TaskCreateRequestDto,
	taskCreateValidationSchema,
} from "~/modules/tasks/tasks.js";

import { TasksApiPath } from "./libs/enums/enums.js";

/**
 * @swagger
 * tags:
 *   - name: tasks
 *     description: Endpoints related to tasks
 *
 * components:
 *   schemas:
 *     TaskRequestDto:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - order
 *         - planDayId
 *       properties:
 *         title:
 *           type: string
 *           example: "Warm-up"
 *         description:
 *           type: string
 *           example: "10-minute stretching routine"
 *         executionTimeType:
 *           type: string
 *           nullable: true
 *           example: "morning"
 *         isCompleted:
 *           type: boolean
 *           example: false
 *         order:
 *           type: number
 *           example: 1
 *         planDayId:
 *           type: number
 *           example: 5
 *
 *     TaskResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 10
 *         title:
 *           type: string
 *           example: "Warm-up"
 *         description:
 *           type: string
 *           example: "10-minute stretching routine"
 *         executionTimeType:
 *           type: string
 *           nullable: true
 *           example: "morning"
 *         isCompleted:
 *           type: boolean
 *           example: false
 *         order:
 *           type: number
 *           example: 1
 *         planDayId:
 *           type: number
 *           example: 5
 *         completedAt:
 *           type: string
 *           nullable: true
 *           example: null
 */
class TaskController extends BaseController {
	private taskService: TaskService;

	public constructor(logger: Logger, taskService: TaskService) {
		super(logger, APIPath.TASKS);

		this.taskService = taskService;

		this.addRoute({
			handler: (options) => this.findById(options as IdParametersOption),
			method: HTTPRequestMethod.GET,
			path: TasksApiPath.TASK,
		});

		this.addRoute({
			handler: (options) =>
				this.create(options as APIBodyOptions<TaskCreateRequestDto>),
			method: HTTPRequestMethod.POST,
			path: TasksApiPath.TASK_CREATE,
			validation: {
				body: taskCreateValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /tasks/create:
	 *   post:
	 *     tags:
	 *       - tasks
	 *     summary: Create a new task
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/TaskRequestDto'
	 *     responses:
	 *       200:
	 *         description: Task created successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/TaskResponseDto'
	 *       401:
	 *         description: Unauthorized - Invalid or missing authentication token
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 message:
	 *                   type: string
	 *                   example: "Unauthorized"
	 */
	private async create(
		options: APIBodyOptions<TaskCreateRequestDto>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.taskService.create(options.body),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /tasks/{id}:
	 *   get:
	 *     tags:
	 *       - tasks
	 *     summary: Get task by ID
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: number
	 *         required: true
	 *         description: ID of the task
	 *     responses:
	 *       200:
	 *         description: Task retrieved successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/TaskResponseDto'
	 *       401:
	 *         description: Unauthorized - Invalid or missing authentication token
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 message:
	 *                   type: string
	 *                   example: "Unauthorized"
	 */
	private async findById(
		options: IdParametersOption,
	): Promise<APIHandlerResponse> {
		const { id } = options.params;

		return {
			payload: await this.taskService.findById(id),
			status: HTTPCode.OK,
		};
	}
}

export { TaskController };
