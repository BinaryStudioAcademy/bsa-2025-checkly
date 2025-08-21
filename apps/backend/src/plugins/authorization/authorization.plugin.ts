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
		authenticate: (request: FastifyRequest, isPublic: boolean) => Promise<void>;
	}

	interface FastifyRequest {
		user: UserDto;
	}
}

type AuthPluginOptions = {
	userService: UserService;
	whiteRoutes: string[];
};

const authStrategy = "Bearer ";

const extractUserFromRequest = async (
	request: FastifyRequest,
	userService: UserService,
	isPublic: boolean,
): Promise<null | UserDto> => {
	try {
		const { authorization } = request.headers;

		if (!authorization?.startsWith(authStrategy) && !isPublic) {
			throw new AuthorizationError({
				message: ErrorMessage.AUTHORIZATION_HEADER_MISSING,
			});
		}

		const tokenValue = authorization?.replace(authStrategy, "");

		const payload = tokenValue
			? ((await token.decode(tokenValue)) as { userId: number })
			: { userId: null };

		const user = payload.userId ? await userService.find(payload.userId) : null;

		if (!user && !isPublic) {
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
	const isAPIRoute = regex.test(url);

	if (!isAPIRoute) {
		return true;
	}

	const [routeWithoutQuery] = url.split("?");

	return whiteRoutes.includes(routeWithoutQuery as string);
};

const authorization = fp<AuthPluginOptions>(
	(fastify, { userService, whiteRoutes }, done) => {
		fastify.decorate(
			"authenticate",
			async function (request: FastifyRequest, isPublic: boolean) {
				const user = await extractUserFromRequest(
					request,
					userService,
					isPublic,
				);

				if (user) {
					request.user = user;
				}
			},
		);

		fastify.addHook("preHandler", async (request: FastifyRequest) => {
			const routeUrl = request.routeOptions.url ?? request.url;

			const isWhiteRoute = checkIsWhiteRoute(routeUrl, whiteRoutes);

			await (isWhiteRoute
				? request.server.authenticate(request, true)
				: request.server.authenticate(request, false));
		});

		done();
	},
);

export { authorization };
