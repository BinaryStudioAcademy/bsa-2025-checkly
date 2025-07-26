import { type FastifyReply, type FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import micromatch from "micromatch";
import { type UserSignUpResponseDto } from "shared";

import { type UserService } from "~/modules/users/user.service.js";

import { verifyJwt } from "./libs/strategies/jwt.strategy.js";

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

const authorization = fp<AuthPluginOptions>(
	(fastify, { userService, whiteRoutes }, done) => {
		fastify.decorate("authenticate", async function (request: FastifyRequest) {
			request.user = await verifyJwt(request, userService);
		});

		fastify.addHook(
			"preHandler",
			async (request: FastifyRequest, reply: FastifyReply) => {
				void reply;

				const routeUrl = request.routeOptions.url || request.url;

				const isWhiteRoute = micromatch.isMatch(routeUrl, whiteRoutes);

				if (isWhiteRoute) {
					return;
				}

				await request.server.authenticate(request);
			},
		);

		done();
	},
);

export { authorization };
