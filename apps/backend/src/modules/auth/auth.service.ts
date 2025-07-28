import { type Encryptor } from "~/libs/modules/encryptor/encryptor.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { tokenModule } from "~/libs/modules/token/token.js";
import {
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

import { UserValidationMessage } from "./libs/enums/enums.js";
import { AuthorizationError } from "./libs/exceptions/exceptions.js";

class AuthService {
	private encryptor: Encryptor;
	private userService: UserService;

	public constructor(userService: UserService, encryptor: Encryptor) {
		this.userService = userService;
		this.encryptor = encryptor;
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto,
	): Promise<{ token: string; user: UserSignInResponseDto }> {
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
				message: UserValidationMessage.PASSWORD_INVALID,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const token = await tokenModule.generateToken(user.toObject().id);

		return { token, user: user.toObject() };
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<{ token: string; user: UserSignUpResponseDto }> {
		const { email } = userRequestDto;

		const existingUserByEmail = await this.userService.findByEmail(email);

		if (existingUserByEmail) {
			throw new AuthorizationError({
				message: UserValidationMessage.EMAIL_ALREADY_EXISTS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const user = await this.userService.create(userRequestDto);

		const token = await tokenModule.generateToken(user.id);

		return { token, user };
	}
}

export { AuthService };
