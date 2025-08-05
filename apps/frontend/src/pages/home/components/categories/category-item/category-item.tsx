import React, { memo, useCallback } from "react";

import { getClassNames } from "~/libs/helpers/get-class-names.js";

import { type CategoryData } from "../libs/types/category-data.js";
import styles from "./category-items.module.css";

type Properties = {
	activeCategoryId: null | string;
	category: CategoryData;
	onCategoryClick: (categoryId: string) => void;
};

const CategoryItemComponent: React.FC<Properties> = ({
	activeCategoryId,
	category,
	onCategoryClick,
}) => {
	const isCurrentlySelected = activeCategoryId === category.id;

	const handleButtonClick = useCallback((): void => {
		onCategoryClick(category.id);
	}, [onCategoryClick, category.id]);

	const categoryItemClasses = getClassNames(
		styles["category-box"],
		styles["category-item-animation"],
	);

	return (
		<li className={categoryItemClasses}>
			<button
				aria-pressed={isCurrentlySelected}
				className={styles["category-button"]}
				onClick={handleButtonClick}
				type="button"
			>
				<img
					alt={category.name}
					className={styles["categories-image"]}
					src={category.image}
				/>
				<h2 className={styles["category-title-landing"]}>{category.name}</h2>
			</button>
		</li>
	);
};

const CategoryItem = memo(CategoryItemComponent);

export { CategoryItem };
