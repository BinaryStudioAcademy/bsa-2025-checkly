import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIBodyOptions,
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPRequestMethod } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserService } from "~/modules/users/user.service.js";
import { userUpdateValidationSchema } from "~/modules/users/users.js";

import {
	removeAvatarController,
	uploadAvatarController,
} from "./helpers/avatar-controller.helper.js";
import { UsersApiPath } from "./libs/enums/enums.js";
import { type UserDto, type UserUpdateRequestDto } from "./libs/types/types.js";

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
			handler: (options) =>
				this.update(
					options as APIBodyOptions<UserUpdateRequestDto> & {
						user?: Pick<UserDto, "id">;
					},
				),
			method: HTTPRequestMethod.POST,
			path: UsersApiPath.ME,
			validation: {
				body: userUpdateValidationSchema,
			},
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

	/**
	 * @swagger
	 * /users/me:
	 *    post:
	 *      summary: Update current user information
	 *      description: Updates the profile data for the currently authenticated user
	 *      security:
	 *        - bearerAuth: []
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                name:
	 *                  type: string
	 *                  description: User's display name
	 *                email:
	 *                  type: string
	 *                  format: email
	 *                  description: User's email address
	 *                dob:
	 *                  type: string
	 *                  format: date
	 *                  nullable: true
	 *                  description: User's date of birth (YYYY-MM-DD)
	 *      responses:
	 *        200:
	 *          description: User successfully updated
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: "#/components/schemas/User"
	 *        401:
	 *          description: Unauthorized - authentication required
	 *        422:
	 *          description: Validation error
	 */
	private async update(
		options: APIBodyOptions<UserUpdateRequestDto> & {
			user?: Pick<UserDto, "id">;
		},
	): Promise<APIHandlerResponse> {
		const userId = options.user?.id;
		const updated = await this.userService.update(
			userId as number,
			options.body,
		);

		return {
			payload: updated,
			status: HTTPCode.OK,
		};
	}

	private async uploadAvatar(
		options: APIHandlerOptions,
	): Promise<APIHandlerResponse> {
		return await uploadAvatarController(this.userService, options);
	}
}

export { UserController };
