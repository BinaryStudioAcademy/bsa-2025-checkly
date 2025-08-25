import { config } from "~/libs/modules/config/config.js";
import { type EmailService } from "~/libs/modules/email-service/email-service.module.js";
import { getHtmlMessage } from "~/libs/modules/email-service/libs/helpers/get-html-message.helper.js";
import { type EmailOptions } from "~/libs/modules/email-service/libs/types/types.js";
import { type Encryptor } from "~/libs/modules/encryptor/encryptor.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { token } from "~/libs/modules/token/token.js";
import {
	type ForgotPasswordRequestDto,
	type ResetPasswordRequestDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
	type VerifyTokenRequestDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

import { getDefaultExpirationDate } from "../password-token/libs/helpers/get-default-expiration-date.helper.js";
import { type PasswordTokenService } from "../password-token/password-token.service.js";
import { type PlanService } from "../plans/plan.service.js";
import { planService } from "../plans/plans.js";
import { UserValidationMessage } from "./libs/enums/enums.js";
import { AuthorizationError } from "./libs/exceptions/exceptions.js";

type ConstructorArguments = {
	emailService: EmailService;
	encryptor: Encryptor;
	passwordTokenService: PasswordTokenService;
	userService: UserService;
};

class AuthService {
	private emailService: EmailService;

	private encryptor: Encryptor;

	private passwordTokenService: PasswordTokenService;

	private planService: PlanService;

	private userService: UserService;

	public constructor({
		emailService,
		encryptor,
		passwordTokenService,
		userService,
	}: ConstructorArguments) {
		this.userService = userService;
		this.encryptor = encryptor;
		this.emailService = emailService;
		this.passwordTokenService = passwordTokenService;
		this.planService = planService;
	}

	public async resetPassword({
		password,
		userId,
	}: ResetPasswordRequestDto): Promise<void> {
		const user = await this.userService.find(userId);

		if (user) {
			const { email, name } = user;
			await this.userService.update(userId, { email, name, password });
		}
	}

	public async sendResetLink(
		forgotPasswordRequestDto: ForgotPasswordRequestDto,
	): Promise<void> {
		const { email } = forgotPasswordRequestDto;

		const user = await this.userService.findByEmail(email);

		if (user) {
			const token = this.passwordTokenService.generateToken();
			const link = config.ENV.EMAIL_SERVICE.RESET_PASSWORD_LINK;
			const userId = user.getId();
			const fullUrl = `${link}?token=${token}&userId=${userId.toString()}`;

			const message = getHtmlMessage(fullUrl);
			const emailOptions: EmailOptions = this.emailService.setEmailOptions(
				message,
				email,
			);
			const emailId = await this.emailService.sendEmail(emailOptions);

			if (emailId) {
				await this.passwordTokenService.create({
					expirationDate: getDefaultExpirationDate(),
					token,
					userId,
				});
			}
		}
	}

	public async signIn({
		planId,
		userRequestDto,
	}: {
		planId?: string;
		userRequestDto: UserSignInRequestDto;
	}): Promise<UserSignInResponseDto> {
		const { email, password } = userRequestDto;

		const user = await this.userService.findByEmail(email);

		if (!user) {
			throw new AuthorizationError({
				message: UserValidationMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { passwordHash, passwordSalt } = user.getPasswordData();

		const isPasswordValid = await this.encryptor.compare(
			password,
			passwordHash,
			passwordSalt,
		);

		if (!isPasswordValid) {
			throw new AuthorizationError({
				message: UserValidationMessage.WRONG_PASSWORD,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const userDto = user.toObject();
		const newToken = await token.generate(userDto.id);

		if (planId) {
			await this.updatePlanWithUser({
				planId: Number(planId),
				userId: userDto.id,
			});
		}

		return { token: newToken, user: userDto };
	}

	public async signUp({
		planId,
		userRequestDto,
	}: {
		planId?: string;
		userRequestDto: UserSignUpRequestDto;
	}): Promise<UserSignUpResponseDto> {
		const { email } = userRequestDto;

		const existingUserByEmail = await this.userService.findByEmail(email);

		if (existingUserByEmail) {
			throw new AuthorizationError({
				message: UserValidationMessage.EMAIL_ALREADY_EXISTS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const userDto = await this.userService.create(userRequestDto);
		const newToken = await token.generate(userDto.id);

		if (planId) {
			await this.updatePlanWithUser({
				planId: Number(planId),
				userId: userDto.id,
			});
		}

		return { token: newToken, user: userDto };
	}

	public async verifyToken({
		token,
		userId,
	}: VerifyTokenRequestDto): Promise<void> {
		const existingToken = await this.passwordTokenService.findByUserId(userId);

		if (!existingToken) {
			throw new AuthorizationError({
				message: UserValidationMessage.LINK_HAS_EXPIRED,
				status: HTTPCode.NOT_FOUND,
			});
		}

		await this.passwordTokenService.checkTokenIsValid(existingToken, token);

		this.passwordTokenService.checkTokenIsExpired(existingToken);
	}

	private async updatePlanWithUser({
		planId,
		userId,
	}: {
		planId: number;
		userId: number;
	}): Promise<void> {
		const plans = await this.planService.findAll();
		const plan = plans.items.some(
			(plan) => plan.id === planId && plan.userId === null,
		);

		if (plan) {
			await this.planService.update(planId, { userId });
		}
	}
}

export { AuthService };
