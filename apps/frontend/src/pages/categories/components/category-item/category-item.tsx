import React, { memo, useCallback } from "react";

import { checkedIcon, unCheckedIcon } from "~/assets/img/common/icons/icons.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import { type CategoryData } from "../../libs/types/category-data.js";
import styles from "./category-items.module.css";

type Properties = {
	activeCategoryId: null | string;
	category: CategoryData;
	isLandingPage?: boolean;
	onCategoryClick: (categoryId: string) => void;
};

const CategoryItemComponent: React.FC<Properties> = ({
	activeCategoryId,
	category,
	isLandingPage,
	onCategoryClick,
}) => {
	const isCurrentlySelected = activeCategoryId === category.id;

	const handleButtonClick = useCallback((): void => {
		onCategoryClick(category.id);
	}, [onCategoryClick, category.id]);

	const size = isLandingPage ? "175px" : "200px";

	const categoryTitle = isLandingPage
		? styles["category-title-landing"]
		: styles["category-title"];

	const imageClassKey = isLandingPage
		? styles["landing-image-position"]
		: styles["image-position"];

	const imageClasses = getClassNames(styles["categories-image"], imageClassKey);
	const categoryItemClasses = getClassNames(
		styles["category-box"],
		styles["category-item-animation"],
	);

	return (
		<li className={categoryItemClasses} style={{ height: size, width: size }}>
			<button
				aria-pressed={isCurrentlySelected}
				className={styles["category-button"]}
				onClick={handleButtonClick}
				type="button"
			>
				<img
					alt="check-box icon"
					className={styles["checkbox-icon"]}
					src={isCurrentlySelected ? checkedIcon : unCheckedIcon}
				/>
				<img
					alt={category.name}
					className={imageClasses}
					src={category.image}
				/>
				<h2 className={categoryTitle}>{category.name}</h2>
			</button>
		</li>
	);
};

const CategoryItem = memo(CategoryItemComponent);

export { CategoryItem };
