import { type FastifyRequest } from "fastify";
import { type JWTPayload, jwtVerify } from "jose";
import {
	AuthorizationError,
	ErrorMessage,
	type UserSignUpResponseDto,
} from "shared";

import { config } from "~/libs/modules/config/config.js";
import { type UserService } from "~/modules/users/user.service.js";

const verifyJwt = async (
	request: FastifyRequest,
	userService: UserService,
): Promise<UserSignUpResponseDto> => {
	try {
		const { authorization } = request.headers;

		if (!authorization?.startsWith("Bearer ")) {
			throw new AuthorizationError({
				message: ErrorMessage.AUTHORIZATION_HEADER_MISSING,
			});
		}

		const token = authorization.replace("Bearer ", "");

		// TODO: once #35 is merged, must use created token module here to decode the token
		const { payload } = await jwtVerify<JWTPayload & { id: number }>(
			token,
			new TextEncoder().encode(config.ENV.JWT.SECRET_KEY),
		);

		const user = await userService.findById(payload.id);

		if (!user) {
			throw new AuthorizationError({
				message: ErrorMessage.USER_NOT_FOUND,
			});
		}

		return user;
	} catch (error) {
		throw new AuthorizationError({
			cause: error,
			message: ErrorMessage.AUTHENTICATION_FAILED,
		});
	}
};

export { verifyJwt };
