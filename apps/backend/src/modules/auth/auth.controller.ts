import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPRequestMethod } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import {
	type ForgotPasswordRequestDto,
	type ResetPasswordRequestDto,
	type UserSignInRequestDto,
	userSignInValidationSchema,
	type UserSignUpRequestDto,
	userSignUpValidationSchema,
	type VerifyTokenRequestDto,
} from "~/modules/users/users.js";

import { type AuthService } from "./auth.service.js";
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
 *           example: user@example.com
 *           description: User's unique email address
 *         name:
 *           type: string
 *           example: New User
 *           description: Full name of the user
 *         password:
 *           type: string
 *           format: password
 *           example: String123
 *           description: User's account password
 */
class AuthController extends BaseController {
	private authService: AuthService;

	public constructor(logger: Logger, authService: AuthService) {
		super(logger, APIPath.AUTH);

		this.authService = authService;

		this.addRoute({
			handler: (options) =>
				this.signIn(
					options as APIHandlerOptions<{
						body: UserSignInRequestDto;
						query?: { planId: string };
					}>,
				),
			isPublic: true,
			method: HTTPRequestMethod.POST,
			path: AuthApiPath.SIGN_IN,
			validation: {
				body: userSignInValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.signUp(
					options as APIHandlerOptions<{
						body: UserSignUpRequestDto;
						query?: { planId: string };
					}>,
				),
			isPublic: true,
			method: HTTPRequestMethod.POST,
			path: AuthApiPath.SIGN_UP,
			validation: {
				body: userSignUpValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => this.getAuthenticatedUser(options),
			method: HTTPRequestMethod.GET,
			path: AuthApiPath.ME,
		});

		this.addRoute({
			handler: (options) =>
				this.sendResetLink(
					options as APIHandlerOptions<{
						body: ForgotPasswordRequestDto;
					}>,
				),
			isPublic: true,
			method: HTTPRequestMethod.POST,
			path: AuthApiPath.FORGOT_PASSWORD,
		});

		this.addRoute({
			handler: (options) =>
				this.verifyToken(
					options as APIHandlerOptions<{
						body: VerifyTokenRequestDto;
					}>,
				),
			isPublic: true,
			method: HTTPRequestMethod.POST,
			path: AuthApiPath.VERIFY_TOKEN,
		});

		this.addRoute({
			handler: (options) =>
				this.resetPassword(
					options as APIHandlerOptions<{
						body: ResetPasswordRequestDto;
					}>,
				),
			isPublic: true,
			method: HTTPRequestMethod.POST,
			path: AuthApiPath.RESET_PASSWORD,
		});
	}

	/**
	 * @swagger
	 * /auth/me:
	 *    get:
	 *      summary: Get authenticated user profile
	 *      description: Returns the profile information of the currently authenticated user
	 *      security:
	 *        - bearerAuth: []
	 *      responses:
	 *        200:
	 *          description: Successfully retrieved user profile
	 *        401:
	 *          description: Unauthorized - Invalid or missing authentication token
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    example: "Unauthorized"
	 */
	private getAuthenticatedUser(options: APIHandlerOptions): APIHandlerResponse {
		return {
			payload: options.user,
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /auth/reset-password:
	 *    post:
	 *      summary: Reset a user's password
	 *      description: Allows a user to reset their password.
	 *      requestBody:
	 *        description: Reset password payload
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                userId:
	 *                  type: number
	 *                  description: Id of the user
	 *                password:
	 *                  type: string
	 *                  format: password
	 *                  description: The new password to set
	 *              required:
	 *                - userId
	 *                - password
	 *      responses:
	 *        200:
	 *          description: Password reset successful
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                nullable: true
	 *        500:
	 *          description: Internal server error
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: The error message
	 */
	private async resetPassword(
		options: APIHandlerOptions<{
			body: ResetPasswordRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		await this.authService.resetPassword(options.body);

		return {
			payload: null,
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /auth/forgot-password:
	 *    post:
	 *      summary: Send password reset link
	 *      description: Sends a password reset link to the user's email address.
	 *      requestBody:
	 *        description: Forgot password payload
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                email:
	 *                  type: string
	 *                  format: email
	 *                  description: The email address of the user requesting a password reset
	 *              required:
	 *                - email
	 *      responses:
	 *        200:
	 *          description: Reset link sent successfully
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                nullable: true
	 *        500:
	 *          description: Internal server error
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

	private async sendResetLink(
		options: APIHandlerOptions<{
			body: ForgotPasswordRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		await this.authService.sendResetLink(options.body);

		return {
			payload: null,
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /auth/login:
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
	 *                    type: string
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
	private async signIn(
		options: APIHandlerOptions<{
			body: UserSignInRequestDto;
			query?: { planId: string };
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.authService.signIn({
				planId: options.query?.planId,
				userRequestDto: options.body,
			}),
			status: HTTPCode.OK,
		};
	}

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
	 *       400:
	 *         description: Bad request - Email already in use
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 status:
	 *                   type: integer
	 *                   example: 400
	 *                 message:
	 *                   type: string
	 *                   example: Email already in use
	 */

	private async signUp(
		options: APIHandlerOptions<{
			body: UserSignUpRequestDto;
			query?: { planId: string };
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.authService.signUp({
				planId: options.query?.planId,
				userRequestDto: options.body,
			}),
			status: HTTPCode.CREATED,
		};
	}

	/**
	 * @swagger
	 * /auth/verify-token:
	 *    post:
	 *      summary: Verify password reset token
	 *      description: Verifies whether a password reset token is valid and not expired.
	 *      requestBody:
	 *        description: Token verification payload
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                token:
	 *                  type: string
	 *                  description: The password reset token to verify
	 * 				  userId:
	 * 					type: number
	 * 					description: The id of the user who is trying to verify token
	 *              required:
	 *                - token
	 *      responses:
	 *        200:
	 *          description: Token is valid
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                nullable: true
	 *        404:
	 *          description: Invalid token
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
	 *        500:
	 *          description: Internal server error
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

	private async verifyToken(
		options: APIHandlerOptions<{
			body: VerifyTokenRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		await this.authService.verifyToken(options.body);

		return {
			payload: null,
			status: HTTPCode.OK,
		};
	}
}

export { AuthController };
