import { type UserGetAllItemResponseDto } from "shared";

type APIHandlerOptions<
	T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
	body: T["body"];
	params: T["params"];
	query: T["query"];
	user?: UserGetAllItemResponseDto;
};

type DefaultApiHandlerOptions = {
	body?: unknown;
	params?: unknown;
	query?: unknown;
};

export { type APIHandlerOptions };
