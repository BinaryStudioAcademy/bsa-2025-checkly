type PlanCategoryDto = {
	iconHref: string;
	id: number;
	key: string;
	order: number;
	title: string;
};

type PlanCategoryWithColorDto = PlanCategoryDto & {
	color: string;
};

export { type PlanCategoryDto, type PlanCategoryWithColorDto };
