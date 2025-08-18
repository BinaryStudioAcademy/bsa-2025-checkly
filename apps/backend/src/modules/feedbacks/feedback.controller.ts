import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIBodyOptions,
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
	type IdParametersOption,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPRequestMethod } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type FeedbackService } from "~/modules/feedbacks/feedback.service.js";

import { FeedbackApiPath } from "./libs/enums/enums.js";
import {
	type FeedbackCreateRequestDto,
	type FeedbackUpdateRequestDto,
} from "./libs/types/types.js";
import {
	feedbackCreateValidationSchema,
	feedbackUpdateValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

/**
 * @swagger
 * tags:
 *   - name: feedbacks
 *     description: Endpoints related to feedbacks
 *
 * components:
 *   schemas:
 *     Feedback:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         text:
 *           type: string
 *           example: "Great service!"
 *         userId:
 *           type: number
 *           example: 1
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               example: 1
 *             email:
 *               type: string
 *               example: "test@example.com"
 *             name:
 *               type: string
 *               example: "Test User"
 *
 *     FeedbackCreateRequestDto:
 *       type: object
 *       required:
 *         - text
 *         - userId
 *       properties:
 *         text:
 *           type: string
 *           example: "New feedback text."
 *         userId:
 *           type: number
 *           example: 1
 *
 *     FeedbackUpdateRequestDto:
 *       type: object
 *       required:
 *         - text
 *         - userId
 *       properties:
 *         text:
 *           type: string
 *           example: "Updated feedback text."
 *         userId:
 *           type: number
 *           example: 1
 */

class FeedbackController extends BaseController {
	private feedbackService: FeedbackService;

	public constructor(logger: Logger, feedbackService: FeedbackService) {
		super(logger, APIPath.FEEDBACKS);

		this.feedbackService = feedbackService;

		this.addRoute({
			handler: (request) =>
				this.findAll(
					request as APIHandlerOptions<{
						query?: { limit?: number; offset?: number };
					}>,
				),
			isPublic: true,
			method: HTTPRequestMethod.GET,
			path: FeedbackApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) => this.findById(options as IdParametersOption),
			method: HTTPRequestMethod.GET,
			path: FeedbackApiPath.FEEDBACK,
		});

		this.addRoute({
			handler: (options) =>
				this.create(options as APIBodyOptions<FeedbackCreateRequestDto>),
			method: HTTPRequestMethod.POST,
			path: FeedbackApiPath.ROOT,
			validation: {
				body: feedbackCreateValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.update(
					options as APIBodyOptions<FeedbackUpdateRequestDto> &
						IdParametersOption & { user: { id: number } },
				),
			method: HTTPRequestMethod.PUT,
			path: FeedbackApiPath.FEEDBACK,
			validation: {
				body: feedbackUpdateValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.delete(options as IdParametersOption & { user: { id: number } }),
			method: HTTPRequestMethod.DELETE,
			path: FeedbackApiPath.FEEDBACK,
		});
	}
	/**
	 * @swagger
	 * /feedbacks:
	 *   post:
	 *     tags:
	 *       - feedbacks
	 *     summary: Create a new feedback
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/FeedbackCreateRequestDto'
	 *     responses:
	 *       '201':
	 *         description: Feedback created successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Feedback'
	 */

	private async create(
		options: APIBodyOptions<FeedbackCreateRequestDto>,
	): Promise<APIHandlerResponse> {
		const feedback = await this.feedbackService.create(options.body);

		return {
			payload: feedback,
			status: HTTPCode.CREATED,
		};
	}
	/**
	 * @swagger
	 * /feedbacks/{id}:
	 *   delete:
	 *     tags:
	 *       - feedbacks
	 *     summary: Delete a feedback by ID (only if created by the current user)
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: number
	 *         required: true
	 *         description: Feedback ID
	 *     responses:
	 *       '204':
	 *         description: Feedback deleted successfully
	 *       '401':
	 *         description: Unauthorized
	 *       '404':
	 *         description: Feedback not found or not owned by the user
	 */

	private async delete(
		options: IdParametersOption & { user: { id: number } },
	): Promise<APIHandlerResponse> {
		const { id } = options.params;
		const { id: userId } = options.user;

		const feedback = await this.feedbackService.deleteById(id, userId);

		if (!feedback.isDeleted) {
			return {
				payload: null,
				status: HTTPCode.NOT_FOUND,
			};
		}

		return {
			payload: null,
			status: HTTPCode.NO_CONTENT,
		};
	}
	/**
	 * @swagger
	 * /feedbacks:
	 *   get:
	 *     tags:
	 *       - feedbacks
	 *     summary: Get all feedbacks
	 *     responses:
	 *       '200':
	 *         description: Successfully retrieved feedbacks
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/Feedback'
	 *       '401':
	 *         description: Unauthorized
	 */
	private async findAll(
		request: APIHandlerOptions<{ query?: { limit?: number; offset?: number } }>,
	): Promise<APIHandlerResponse> {
		const { query = {} } = request;
		const options: { limit?: number; offset?: number } = {};

		if (query.limit) {
			options.limit = Number(query.limit);
		}

		if (query.offset) {
			options.offset = Number(query.offset);
		}

		const feedbackData = await this.feedbackService.findAll(options);

		return {
			payload: feedbackData,
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /feedbacks/{id}:
	 *   get:
	 *     tags:
	 *       - feedbacks
	 *     summary: Get feedback by ID
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: integer
	 *         required: true
	 *         description: Feedback ID
	 *     responses:
	 *       '200':
	 *         description: Feedback retrieved successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Feedback'
	 *       '401':
	 *         description: Unauthorized
	 *       '404':
	 *         description: Feedback not found
	 */

	private async findById(
		options: IdParametersOption,
	): Promise<APIHandlerResponse> {
		const { id } = options.params;
		const feedback = await this.feedbackService.findById(id);

		if (!feedback) {
			return {
				payload: null,
				status: HTTPCode.NOT_FOUND,
			};
		}

		return {
			payload: feedback,
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /feedbacks/{id}:
	 *   patch:
	 *     tags:
	 *       - feedbacks
	 *     summary: Update feedback by ID
	 *     description: Updates an existing feedback. Only the owner can update it.
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: Feedback ID
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               message:
	 *                 type: string
	 *                 example: "Updated feedback text"
	 *               rating:
	 *                 type: integer
	 *                 example: 5
	 *     responses:
	 *       '200':
	 *         description: Successfully updated feedback
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Feedback'
	 *       '400':
	 *         description: Invalid request
	 *       '401':
	 *         description: Unauthorized
	 *       '404':
	 *         description: Feedback not found
	 */

	private async update(
		options: APIBodyOptions<FeedbackUpdateRequestDto> &
			IdParametersOption & { user: { id: number } },
	): Promise<APIHandlerResponse> {
		const { id } = options.params;
		const { id: userId } = options.user;

		const feedback = await this.feedbackService.updateById(
			id,
			options.body,
			userId,
		);

		if (!feedback) {
			return {
				payload: null,
				status: HTTPCode.NOT_FOUND,
			};
		}

		return {
			payload: feedback,
			status: HTTPCode.OK,
		};
	}
}

export { FeedbackController };
