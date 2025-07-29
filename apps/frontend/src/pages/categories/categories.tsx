import React, { useState } from "react";

import { blueStars } from "~/assets/img/categories/categories.js";
import { twinkles } from "~/assets/img/sign-in/sign-in.img.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { CategoryItem } from "~/pages/categories/components/category-item/category-item.js";
import { categories } from "~/pages/categories/libs/constants.js";

import styles from "./styles.module.css";

const CategoriesPage: React.FC = () => {
	const [activeCategory, setActiveCategory] = useState<null | string>(null);

	const handleCategoryClick = useCallback(
		(category: string) => {
			if (activeCategory) {
				setActiveCategory(null);
			} else {
				setActiveCategory(category);
			}
		},
		[activeCategory],
	);

	const blueStarsClasses = getClassNames(
		styles["image-position"],
		styles["blue-stars"],
	);
	const twinklesClasses = getClassNames(
		styles["image-position"],
		styles["yellow-stars"],
	);
	const categoriesList = getClassNames("cluster", styles["category-list"]);

	return (
		<section
			className={styles["categories"]}
			data-section-variant="categories-section"
		>
			<div className="wrapper">
				<h1 className={styles["title"]}>Categories</h1>
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
			</div>
			<img alt="yellow stars" className={twinklesClasses} src={twinkles} />
			<img alt="blue stars" className={blueStarsClasses} src={blueStars} />
		</section>
	);
};

export { CategoriesPage };
