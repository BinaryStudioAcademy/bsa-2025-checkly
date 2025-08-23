import {
	type DataStatus,
	type PlanCategoryWithColorDto,
	type ValueOf,
} from "shared";

type PlanCategoryState = {
	dataStatus: ValueOf<typeof DataStatus>;
	planCategories: PlanCategoryWithColorDto[];
};

export { type PlanCategoryState };
