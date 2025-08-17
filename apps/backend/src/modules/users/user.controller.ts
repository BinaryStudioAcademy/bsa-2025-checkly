import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIBodyOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPRequestMethod } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserDto } from "~/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";
import { userUpdateValidationSchema } from "~/modules/users/users.js";

import { UsersApiPath } from "./libs/enums/enums.js";
import { type UserUpdateRequestDto } from "./libs/types/types.js";

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
						user: UserDto;
					},
				),
			method: HTTPRequestMethod.POST,
			path: UsersApiPath.ME,
			validation: {
				body: userUpdateValidationSchema,
			},
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
		options: APIBodyOptions<UserUpdateRequestDto> & { user: UserDto },
	): Promise<APIHandlerResponse> {
		const userId = options.user.id;
		const updated = await this.userService.update(userId, options.body);

		return {
			payload: updated,
			status: HTTPCode.OK,
		};
	}
}

export { UserController };
