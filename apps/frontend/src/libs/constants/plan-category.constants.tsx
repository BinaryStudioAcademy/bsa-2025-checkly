import { PlanCategoryId as PlanCategoryIdEnum } from "~/libs/enums/enums.js";
import { type ValueOf, type ViewOptions } from "~/libs/types/types.js";

type CategoryId = ValueOf<typeof PlanCategoryIdEnum>;

const PLAN_CATEGORY_STYLES: Record<CategoryId, ViewOptions> = {
	[PlanCategoryIdEnum.DESKTOP]: "desktop",
	[PlanCategoryIdEnum.MOBILE]: "mobile",
	[PlanCategoryIdEnum.PDF]: "regular",
} as const;

const getCategoryStyle = (categoryId: CategoryId): ViewOptions => {
	return PLAN_CATEGORY_STYLES[categoryId];
};

export { type CategoryId, getCategoryStyle };
