import { ZERO_CATEGORY_ID } from "../../../libs/enums/enums.js";

const ZERO_CATEGORY_ORDER = 0;

const defaultCategoryOption = {
	iconHref: undefined,
	id: ZERO_CATEGORY_ID,
	order: ZERO_CATEGORY_ORDER,
	title: "All categories",
} as const;

export { defaultCategoryOption };
