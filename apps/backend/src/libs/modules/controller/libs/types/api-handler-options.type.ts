import { type FastifyRequest } from "fastify";

import { type UserDto } from "~/libs/types/types.js";

type APIBodyOptions<T> = APIHandlerOptions<{ body: T }>;

type APIHandlerOptions<
	T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
	body: T["body"];
	params: T["params"];
	query: T["query"];
	request?: FastifyRequest;
	user?: UserDto;
};

type DefaultApiHandlerOptions = {
	body?: unknown;
	params?: unknown;
	query?: unknown;
};

type IdParameter = {
	id: number;
};

type IdParametersOption = APIHandlerOptions<{ params: IdParameter }>;

export { type APIBodyOptions, type APIHandlerOptions, type IdParametersOption };
