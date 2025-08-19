import { config } from "~/libs/modules/config/config.js";
import { type EmailService } from "~/libs/modules/email-service/email-service.module.js";
import { getHtmlMessage } from "~/libs/modules/email-service/libs/helpers/get-html-message.helper.js";
import { type EmailOptions } from "~/libs/modules/email-service/libs/types/types.js";
import { type Encryptor } from "~/libs/modules/encryptor/encryptor.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { token } from "~/libs/modules/token/token.js";
import {
	type ForgotPasswordRequestDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

import { DEFAULT_EXPIRATION_DATE } from "../password-token/libs/constants/default-expiration-date.js";
import { type PasswordTokenService } from "../password-token/password-token.service.js";
import { UserValidationMessage } from "./libs/enums/enums.js";
import { AuthorizationError } from "./libs/exceptions/exceptions.js";

class AuthService {
	private emailService: EmailService;

	private encryptor: Encryptor;

	private passwordTokenService: PasswordTokenService;

	private userService: UserService;

	// eslint-disable-next-line max-params
	public constructor(
		userService: UserService,
		encryptor: Encryptor,
		emailService: EmailService,
		passwordTokenService: PasswordTokenService,
	) {
		this.userService = userService;
		this.encryptor = encryptor;
		this.emailService = emailService;
		this.passwordTokenService = passwordTokenService;
	}

	public async sendResetLink(
		forgotPasswordRequestDto: ForgotPasswordRequestDto,
	): Promise<void> {
		const { email } = forgotPasswordRequestDto;

		const user = await this.userService.findByEmail(email);

		if (user) {
			const token = this.passwordTokenService.generateToken();
			await this.passwordTokenService.create({
				expirationDate: DEFAULT_EXPIRATION_DATE,
				token,
				userId: user.getId(),
			});

			const link = config.ENV.EMAIL_SERVICE.RESET_PASSWORD_LINK;

			const message = getHtmlMessage(`${link}?token=${token}`);
			const emailOptions: EmailOptions = this.emailService.setEmailOptions(
				message,
				email,
			);
			await this.emailService.sendEmail(emailOptions);
		}
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
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
		const newToken = await token.generateToken(userDto.id);

		return { token: newToken, user: userDto };
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const { email } = userRequestDto;

		const existingUserByEmail = await this.userService.findByEmail(email);

		if (existingUserByEmail) {
			throw new AuthorizationError({
				message: UserValidationMessage.EMAIL_ALREADY_EXISTS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const userDto = await this.userService.create(userRequestDto);
		const newToken = await token.generateToken(userDto.id);

		return { token: newToken, user: userDto };
	}
}

export { AuthService };
