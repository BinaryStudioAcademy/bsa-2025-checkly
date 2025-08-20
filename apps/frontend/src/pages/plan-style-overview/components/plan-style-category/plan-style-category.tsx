import React, { useCallback } from "react";

import {
	type CategoryId,
	getCategoryIcon,
	getCategoryName,
	getCategoryShortName,
} from "~/libs/constants/constants.js";
import { getClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	categories: CategoryId[];
	onCategorySelect?: (categoryId: CategoryId) => void;
	selectedCategory: CategoryId;
};

const PlanStyleCategory: React.FC<Properties> = ({
	categories,
	onCategorySelect,
	selectedCategory,
}) => {
	const handleCategoryClick = useCallback(
		(categoryId: CategoryId): (() => void) =>
			() => {
				onCategorySelect?.(categoryId);
			},
		[onCategorySelect],
	);

	return (
		<div className={styles["category-container"]}>
			{categories.map((categoryId) => {
				const categoryName = getCategoryName(categoryId);

				return (
					<button
						aria-label={`Select ${categoryName} category`}
						className={getClassNames(
							styles["category-button"],
							selectedCategory === categoryId ? styles["active"] : "",
						)}
						key={categoryId}
						onClick={handleCategoryClick(categoryId)}
						type="button"
					>
						<span className={styles["category-icon"]}>
							{getCategoryIcon(categoryId)}
						</span>
						<span className={styles["category-name-full"]}>{categoryName}</span>
						<span className={styles["category-name-short"]}>
							{getCategoryShortName(categoryId)}
						</span>
					</button>
				);
			})}
		</div>
	);
};

export { PlanStyleCategory };
