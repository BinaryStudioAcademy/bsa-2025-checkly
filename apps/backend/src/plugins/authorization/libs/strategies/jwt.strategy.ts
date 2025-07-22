import { type FastifyRequest } from "fastify";
import { type JWTPayload, jwtVerify } from "jose";

import { config } from "~/libs/modules/config/config.js";
import { type UserEntity } from "~/modules/users/user.entity.js";

import { AuthorizationError } from "../../exceptions/exceptions.js";

const verifyJwt = async (request: FastifyRequest): Promise<UserEntity> => {
	try {
		const { authorization } = request.headers;

		if (!authorization?.startsWith("Bearer ")) {
			throw new AuthorizationError({
				message: "Authorization header is missing or invalid.",
			});
		}

		const token = authorization.replace("Bearer ", "");
		const { payload } = await jwtVerify<JWTPayload & { id: number }>(
			token,
			new TextEncoder().encode(config.ENV.JWT.SECRET_KEY),
		);

		const { userService } = request.server;
		const user = await userService.findById(payload.id);

		if (!user) {
			throw new AuthorizationError({
				message: "User not found.",
			});
		}

		return user;
	} catch (error) {
		throw new AuthorizationError({
			cause: error,
			message: "Authentication failed.",
		});
	}
};

export { verifyJwt };
