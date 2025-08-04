import { type UserDto } from "~/libs/types/types.js";

type APIHandlerOptions<
	T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
	body: T["body"];
	params: T["params"];
	query: T["query"];
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

export { type APIHandlerOptions, type IdParameter };
