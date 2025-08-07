import { useCallback, useState } from "react";

import { type CategoryId } from "~/libs/constants/constants.js";
import { PlanCategoryId } from "~/libs/enums/enums.js";

type UsePlanCategoryReturn = {
	handleCategorySelect: (categoryId: CategoryId) => void;
	selectedCategory: CategoryId;
};

const usePlanCategory = (
	initialCategory: CategoryId = PlanCategoryId.PDF,
): UsePlanCategoryReturn => {
	const [selectedCategory, setSelectedCategory] =
		useState<CategoryId>(initialCategory);

	const handleCategorySelect = useCallback((categoryId: CategoryId): void => {
		setSelectedCategory(categoryId);
	}, []);

	return {
		handleCategorySelect,
		selectedCategory,
	};
};

export { usePlanCategory };
