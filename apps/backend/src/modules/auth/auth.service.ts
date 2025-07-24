import { ErrorMessage } from "~/libs/enums/enums.js";
import { type Encryptor } from "~/libs/modules/encryptor/encryptor.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { AuthenticationError } from "~/libs/modules/http/libs/exceptions/exceptions.js";
import {
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

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
			throw new AuthenticationError({
				message: ErrorMessage.AUTH.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { passwordHash, passwordSalt } = user.getPasswordData();

		const isPasswordValid = await this.encryptor.decrypt(
			password,
			passwordHash,
			passwordSalt,
		);

		if (!isPasswordValid) {
			throw new AuthenticationError({
				message: ErrorMessage.AUTH.INVALID_PASSWORD,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		return {
			...user.toObject(),
		};
	}

	public signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		return this.userService.create(userRequestDto);
	}
}

export { AuthService };
