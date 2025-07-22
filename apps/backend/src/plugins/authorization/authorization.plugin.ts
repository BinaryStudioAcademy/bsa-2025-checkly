import fp from "fastify-plugin";

import { type UserEntity } from "~/modules/users/user.entity.js";
import { type UserService } from "~/modules/users/user.service.js";

import { verifyJwt } from "./libs/strategies/jwt.strategy.js";

declare module "fastify" {
	interface FastifyRequest {
		user: UserEntity;
		authenticate: () => Promise<void>;
	}

	interface FastifyInstance {
		authenticate: (request: FastifyRequest) => Promise<void>;
		userService: UserService;
	}
}

type AuthPluginOptions = {
	userService: UserService;
	whiteRoutes: string[];
};

const authorization = fp<AuthPluginOptions>(
	async (fastify, { userService, whiteRoutes }) => {
		fastify.decorate("userService", userService);
		fastify.decorate("authenticate", async function (request) {
			request.user = await verifyJwt(request);
		});

		fastify.addHook("onRequest", async (request, reply) => {
			const routeUrl = request.routeOptions.url ?? "";
			const isWhiteRoute = whiteRoutes.includes(routeUrl);

			if (isWhiteRoute) {
				return;
			}

			try {
				await request.authenticate();
			} catch (error) {
				await reply.send(error);
			}
		});
	}
);

export { authorization };