import { ZERO } from "../../../libs/enums/enums.js";

const ZERO_CATEGORY_ORDER = 0;

const defaultCategoryOption = {
	iconHref: undefined,
	id: ZERO,
	order: ZERO_CATEGORY_ORDER,
	title: "All categories",
} as const;

export { defaultCategoryOption };
