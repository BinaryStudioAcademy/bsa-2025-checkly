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
	private userService: UserService;

	public constructor(userService: UserService) {
		this.userService = userService;
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
		const { email } = userRequestDto;

		const user = await this.userService.findByEmail(email);

		if (!user) {
			throw new AuthenticationError({
				message: "User not found",
				status: HTTPCode.NOT_FOUND,
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
