import React, { useState } from "react";

import { blueStars } from "~/assets/img/categories/categories.js";
import { twinkles } from "~/assets/img/sign-in/sign-in.img.js";
import { DecorativeImage } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { CategoryItem } from "~/pages/categories/components/category-item/category-item.js";
import { categories } from "~/pages/categories/libs/constants.js";

import styles from "./styles.module.css";

const Categories: React.FC = () => {
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
							isLandingPage
							key={category.id}
							onCategoryClick={handleCategoryClick}
						/>
					))}
				</ul>
			</div>
			<DecorativeImage className={twinklesClasses} src={twinkles} />
			<DecorativeImage className={blueStarsClasses} src={blueStars} />
		</section>
	);
};

export { Categories };
