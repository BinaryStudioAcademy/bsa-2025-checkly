import { type Encryptor } from "~/libs/modules/encryptor/encryptor.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { token } from "~/libs/modules/token/token.js";
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
