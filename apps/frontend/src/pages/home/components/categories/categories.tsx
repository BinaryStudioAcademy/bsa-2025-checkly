import React, { useState } from "react";

import {
	StarsPink01,
	TwinklesYellow,
} from "~/assets/img/shared/shapes/shapes.img.js";
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
			setActiveCategory(activeCategory === category ? null : category);
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
			<DecorativeImage className={twinklesClasses} src={TwinklesYellow} />
			<DecorativeImage className={blueStarsClasses} src={StarsPink01} />
		</section>
	);
};

export { Categories };
