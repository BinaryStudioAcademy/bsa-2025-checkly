import fp from "fastify-plugin";
import micromatch from "micromatch";

import { type UserEntity } from "../../modules/users/user.entity.js";
import { type UserService } from "../../modules/users/user.service.js";
import { verifyJwt } from "./libs/strategies/jwt.strategy.js";

type UserAuthResponse = ReturnType<UserEntity["toObject"]>;

declare module "fastify" {
	interface FastifyInstance {
		authenticate: (request: FastifyRequest) => Promise<void>;
		userService: UserService;
	}

	interface FastifyRequest {
		user: UserAuthResponse;
	}
}

type AuthPluginOptions = {
	userService: UserService;
	whiteRoutes: string[];
};

const authorization = fp<AuthPluginOptions>(
	(fastify, { userService, whiteRoutes }, done) => {
		fastify.decorate("userService", userService);
		fastify.decorate("authenticate", async function (request) {
			request.user = await verifyJwt(request);
		});

		fastify.addHook("onRequest", async (request, reply) => {
			const routeUrl = request.routeOptions.url ?? "";

			const isWhiteRoute = micromatch.isMatch(routeUrl, whiteRoutes);

			if (isWhiteRoute) {
				return;
			}

			try {
				await fastify.authenticate(request);
			} catch (error) {
				await reply.send(error as Error);
			}
		});

		done();
	},
);

export { authorization };
