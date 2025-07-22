import { type FastifyRequest } from "fastify";
import { jwtVerify, type JWTPayload } from "jose";

import { config } from "~/libs/modules/config/config.js";
import { type UserEntity } from "~/modules/users/user.entity.js";
import { type UserService } from "~/modules/users/user.service.js";

import { AuthorizationError } from "../../exceptions/exceptions.js";

const verifyJwt = async (
	request: FastifyRequest
): Promise<UserEntity> => {
	try {
		const { authorization } = request.headers;

		if (!authorization?.startsWith("Bearer ")) {
			throw new AuthorizationError({
				message: "Authorization header is missing or invalid.",
			});
		}

		const token = authorization.replace("Bearer ", "");
		const { payload } = await jwtVerify<{ id: number } & JWTPayload>(
			token,
			new TextEncoder().encode(config.ENV.JWT.SECRET_KEY)
		);

		const userService: UserService = request.server.userService;
		const user = await userService.findById(payload.id);

		if (!user) {
			throw new AuthorizationError({
				message: "User not found.",
			});
		}

		return user;
	} catch (error) {
		throw new AuthorizationError({
			message: "Authentication failed.",
			cause: error,
		});
	}
};

export { verifyJwt };