import { UserValidationMessage } from "shared/src/modules/users/libs/enums/user-validation-message.enum.js";

import { HTTPCode } from "~/libs/modules/http/http.js";
import {
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

import { AuthError } from "./libs/exceptions/exceptions.js";

class AuthService {
	private userService: UserService;

	public constructor(userService: UserService) {
		this.userService = userService;
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const { email, name } = userRequestDto;

		const existingUserByName = await this.userService.findByName(name);

		if (existingUserByName) {
			throw new AuthError({
				message: UserValidationMessage.NAME_TAKEN,
				status: HTTPCode.CONFLICT,
			});
		}

		const existingUserByEmail = await this.userService.findByEmail(email);

		if (existingUserByEmail) {
			throw new AuthError({
				message: UserValidationMessage.EMAIL_TAKEN,
				status: HTTPCode.CONFLICT,
			});
		}

		return await this.userService.create(userRequestDto);
	}
}

export { AuthService };
