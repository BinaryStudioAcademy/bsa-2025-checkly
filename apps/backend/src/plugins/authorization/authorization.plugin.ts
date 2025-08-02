import { type FastifyRequest } from "fastify";
import fp from "fastify-plugin";

import { token } from "~/libs/modules/token/token.js";
import { type UserService } from "~/modules/users/user.service.js";

import {
	AuthorizationError,
	ErrorMessage,
	type UserDto,
} from "./libs/types/types.js";

declare module "fastify" {
	interface FastifyInstance {
		authenticate: (request: FastifyRequest) => Promise<void>;
	}

	interface FastifyRequest {
		user: UserDto;
	}
}

type AuthPluginOptions = {
	userService: UserService;
	whiteRoutes: string[];
};

const AuthStrategy = "Bearer ";

const extractUserFromRequest = async (
	request: FastifyRequest,
	userService: UserService,
): Promise<UserDto> => {
	try {
		const { authorization } = request.headers;

		if (!authorization?.startsWith(AuthStrategy)) {
			throw new AuthorizationError({
				message: ErrorMessage.AUTHORIZATION_HEADER_MISSING,
			});
		}

		const tokenValue = authorization.replace(AuthStrategy, "");

		const payload = (await token.decodeToken(tokenValue)) as { userId: number };

		const user = await userService.findById(payload.userId);

		if (!user) {
			throw new AuthorizationError({
				message: ErrorMessage.USER_NOT_FOUND,
			});
		}

		return user;
	} catch (error) {
		if (error instanceof Error) {
			throw new AuthorizationError({
				cause: error,
				message: ErrorMessage.AUTHENTICATION_FAILED,
			});
		}

		throw new AuthorizationError({
			message: ErrorMessage.AUTHENTICATION_FAILED,
		});
	}
};

const checkIsWhiteRoute = (url: string, whiteRoutes: string[]): boolean => {
	const regex = /^\/api\/v\d+(\/.+)$/;
	const match = regex.exec(url);
	const [, route] = match ?? [];

	if (!route) {
		return true;
	}

	const ROUTE_WITH_QUERY_INDEX = 0;

	const routeWithoutQuery = route.split("?")[ROUTE_WITH_QUERY_INDEX] as string;

	return whiteRoutes.includes(routeWithoutQuery);
};

const authorization = fp<AuthPluginOptions>(
	(fastify, { userService, whiteRoutes }, done) => {
		fastify.decorate("authenticate", async function (request: FastifyRequest) {
			request.user = await extractUserFromRequest(request, userService);
		});

		fastify.addHook("preHandler", async (request: FastifyRequest) => {
			const routeUrl = request.routeOptions.url || request.url;

			const isWhiteRoute = checkIsWhiteRoute(routeUrl, whiteRoutes);

			if (isWhiteRoute) {
				return;
			}

			await request.server.authenticate(request);
		});

		done();
	},
);

export { authorization };
