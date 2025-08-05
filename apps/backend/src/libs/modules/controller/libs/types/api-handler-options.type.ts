import { type UserDto } from "~/libs/types/types.js";

type APIBodyOptions<T> = APIHandlerOptions<{ body: T }>;

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
type IdParametersOption = APIHandlerOptions<{ params: IdParameter }>;

export {
	type APIBodyOptions,
	type APIHandlerOptions,
	type IdParametersOption as IdParamsOption,
};
