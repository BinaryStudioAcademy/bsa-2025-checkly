import { type FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { type JWTPayload, jwtVerify } from "jose";
import micromatch from "micromatch";

import { config } from "~/libs/modules/config/config.js";
import { type UserService } from "~/modules/users/user.service.js";

import {
	AuthorizationError,
	ErrorMessage,
	type UserSignUpResponseDto,
} from "./libs/types/types.js";

declare module "fastify" {
	interface FastifyInstance {
		authenticate: (request: FastifyRequest) => Promise<void>;
	}

	interface FastifyRequest {
		user: UserSignUpResponseDto;
	}
}

type AuthPluginOptions = {
	userService: UserService;
	whiteRoutes: string[];
};

const extractUserFromRequest = async (
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

const authorization = fp<AuthPluginOptions>(
	(fastify, { userService, whiteRoutes }, done) => {
		fastify.decorate("authenticate", async function (request: FastifyRequest) {
			request.user = await extractUserFromRequest(request, userService);
		});

		fastify.addHook("preHandler", async (request: FastifyRequest) => {
			const routeUrl = request.routeOptions.url || request.url;

			const isWhiteRoute = micromatch.isMatch(routeUrl, whiteRoutes);

			if (isWhiteRoute) {
				return;
			}

			await request.server.authenticate(request);
		});

		done();
	},
);

export { authorization };
