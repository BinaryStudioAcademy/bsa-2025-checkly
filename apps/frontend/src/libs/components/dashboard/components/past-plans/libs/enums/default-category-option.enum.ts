import { ZERO_CATEGORY_ID } from "../../../libs/enums/enums.js";

const defaultCategoryOption = {
	iconHref: undefined,
	id: ZERO_CATEGORY_ID,
	order: 0,
	title: "All categories",
} as const;

export { defaultCategoryOption };
