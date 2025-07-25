import { type UserGetAllItemResponseDto } from "shared";

import { type Encryptor } from "~/libs/modules/encryptor/encryptor.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
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
				message: UserValidationMessage.PASSWORD_INVALID,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		return user.toObject();
	}

	public async getAuthenticatedUser(
		userId: number,
	): Promise<null | UserGetAllItemResponseDto> {
		return await this.userService.findById(userId);
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

		return await this.userService.create(userRequestDto);
	}
}

export { AuthService };
