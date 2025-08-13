import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPRequestMethod } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserService } from "~/modules/users/user.service.js";

import {
	removeAvatarController,
	uploadAvatarController,
} from "./helpers/avatar-controller.helper.js";
import { UsersApiPath } from "./libs/enums/enums.js";

/*** @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: number
 *           minimum: 1
 *         email:
 *           type: string
 *           format: email
 *         name:
 *           type: string
 *         avatarUrl:
 *           type: string
 *           format: uri
 *           nullable: true
 */
class UserController extends BaseController {
	private userService: UserService;

	public constructor(logger: Logger, userService: UserService) {
		super(logger, APIPath.USERS);

		this.userService = userService;

		this.addRoute({
			handler: () => this.findAll(),
			method: HTTPRequestMethod.GET,
			path: UsersApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) => this.uploadAvatar(options),
			method: HTTPRequestMethod.POST,
			path: UsersApiPath.AVATAR,
		});

		this.addRoute({
			handler: (options) => this.removeAvatar(options),
			method: HTTPRequestMethod.DELETE,
			path: UsersApiPath.AVATAR,
		});
	}

	/**
	 * @swagger
	 * /users:
	 *    get:
	 *      description: Returns an array of users
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: array
	 *                items:
	 *                  $ref: "#/components/schemas/User"
	 */
	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.userService.findAll(),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /users/{id}/avatar:
	 *   post:
	 *     summary: Upload/replace user avatar (PNG/JPG up to 2MB)
	 *     tags: [Users]
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: integer
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         multipart/form-data:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               avatar:
	 *                 type: string
	 *                 format: binary
	 *     responses:
	 *       "200":
	 *         description: Updated user
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/User'
	 *       "400":
	 *         description: Invalid file or user not found
	 *   delete:
	 *     summary: Remove user avatar
	 *     tags: [Users]
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: integer
	 *     responses:
	 *       "200":
	 *         description: Updated user
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/User'
	 */
	private async removeAvatar(
		options: APIHandlerOptions,
	): Promise<APIHandlerResponse> {
		return await removeAvatarController(this.userService, options);
	}

	private async uploadAvatar(
		options: APIHandlerOptions,
	): Promise<APIHandlerResponse> {
		return await uploadAvatarController(this.userService, options);
	}
}

export { UserController };
