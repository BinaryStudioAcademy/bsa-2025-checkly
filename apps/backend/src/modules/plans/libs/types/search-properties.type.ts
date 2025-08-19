import { type PlanSearchQueryParameter } from "shared";

type SearchProperties = PlanSearchQueryParameter & {
	userId: number;
};

export { type SearchProperties };
