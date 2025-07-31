import React, { useState } from "react";

import {
	blueArrow,
	blueStars,
	twinkles,
	yellowStars,
} from "~/assets/img/categories/categories.js";
import { Button } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { CategoryItem } from "~/pages/categories/components/category-item/category-item.js";
import { categories } from "~/pages/categories/libs/constants.js";

import styles from "./styles.module.css";

const CategoriesPage: React.FC = () => {
	const [activeCategory, setActiveCategory] = useState<null | string>(null);

	const handleCategoryClick = useCallback(
		(category: string) => {
			if (activeCategory === category) {
				setActiveCategory(null);
			} else {
				setActiveCategory(category);
			}
		},
		[activeCategory],
	);

	const blueStarsClasses = getClassNames(
		styles["image-position"],
		styles["blue-stars-image"],
	);
	const blueArrowClasses = getClassNames(
		styles["image-position"],
		styles["blue-arrow-image"],
	);
	const yellowStarsClasses = getClassNames(
		styles["image-position"],
		styles["yellow-stars-image"],
	);
	const twinklesClasses = getClassNames(
		styles["image-position"],
		styles["twinkles-image"],
	);
	const categoriesList = getClassNames("cluster", styles["category-list"]);
	const wrapperClasses = getClassNames("wrapper", styles["wrapper-display"]);

	return (
		<section
			className={styles["categories"]}
			data-section-variant="categories-section"
		>
			<div className={styles["categories-border-wrapper"]}>
				<div className={wrapperClasses}>
					<h1 className={styles["title"]}>
						Pick the field you&apos;d like to improve{" "}
					</h1>
					<ul className={categoriesList}>
						{categories.map((category) => (
							<CategoryItem
								activeCategoryId={activeCategory}
								category={category}
								key={category.id}
								onCategoryClick={handleCategoryClick}
							/>
						))}
					</ul>
					<Button label="Create an account" type="button" />
				</div>
				<img alt="twinkles" className={twinklesClasses} src={twinkles} />
				<img alt="blue-arrow" className={blueArrowClasses} src={blueArrow} />
				<img
					alt="yellow stars"
					className={yellowStarsClasses}
					src={yellowStars}
				/>
				<img alt="blue stars" className={blueStarsClasses} src={blueStars} />
			</div>
		</section>
	);
};

export { CategoriesPage };
