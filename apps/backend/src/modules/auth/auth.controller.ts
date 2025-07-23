import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import {
	type UserSignUpRequestDto,
	userSignUpValidationSchema,
} from "~/modules/users/users.js";

import { type AuthService } from "./auth.service.js";
import { JWTService } from "./jwt-auth/jwt.service.js";
import { AuthApiPath } from "./libs/enums/enums.js";

/**
 * @swagger
 * tags:
 *   - name: auth
 *     description: Endpoints related to authentication
 *
 * components:
 *   schemas:
 *     UserSignUpRequestDto:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: johndoe@example.com
 *           description: User's unique email address
 *         name:
 *           type: string
 *           example: John Doe
 *           description: Full name of the user
 *         password:
 *           type: string
 *           format: password
 *           example: StrongPassword123!
 *           description: User's account password
 */
class AuthController extends BaseController {
	private authService: AuthService;
	private jwtService = new JWTService();

	public constructor(logger: Logger, authService: AuthService) {
		super(logger, APIPath.AUTH);

		this.authService = authService;

		this.addRoute({
			handler: (options) =>
				this.signUp(
					options as APIHandlerOptions<{
						body: UserSignUpRequestDto;
					}>,
				),
			method: "POST",
			path: AuthApiPath.SIGN_UP,
			validation: {
				body: userSignUpValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /auth/sign-in:
	 *    post:
	 *      description: Sign in user into the system
	 *      requestBody:
	 *        description: User auth data
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                email:
	 *                  type: string
	 *                  format: email
	 *                password:
	 *                  type: string
	 *      responses:
	 *        201:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: object
	 *                    $ref: "#/components/schemas/User"
	 *        401:
	 *          description: Unauthorized
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: The error message
	 *                  status:
	 *                    type: number
	 *                    description: The HTTP status code
	 *        404:
	 *          description: Not found
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: The error message
	 *                  status:
	 *                    type: number
	 *                    description: The HTTP status code
	 */

	/**
	 * @swagger
	 * /auth/sign-up:
	 *   post:
	 *     tags:
	 *       - auth
	 *     summary: Sign up a new user
	 *     requestBody:
	 *       description: User credentials
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/UserSignUpRequestDto'
	 *     responses:
	 *       201:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 message:
	 *                   $ref: "#/components/schemas/User"
	 *       409:
	 *         description: Conflict - Email or username already exists
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 status:
	 *                   type: integer
	 *                   example: 409
	 *                 message
	 *                   type: string
	 *                   example: Email is already taken
	 */

	private async signUp(
		options: APIHandlerOptions<{
			body: UserSignUpRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		const user = await this.authService.signUp(options.body);

		user.token = await this.jwtService.generateToken(user.id.toString());

		return {
			payload: {
				user,
			},
			status: HTTPCode.CREATED,
		};
	}
}

export { AuthController };
