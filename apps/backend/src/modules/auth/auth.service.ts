import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import {
	type UserProfileResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

class AuthService {
	private userService: UserService;

	public constructor(userService: UserService) {
		this.userService = userService;
	}

	public async getAuthenticatedUser(
		userId: number,
	): Promise<UserProfileResponseDto> {
		const user = await this.userService.findById(userId);

		if (!user) {
			throw new HTTPError({
				message: "User not found",
				status: HTTPCode.NOT_FOUND,
			});
		}

		return user;
	}

	public signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		return this.userService.create(userRequestDto);
	}
}

export { AuthService };
