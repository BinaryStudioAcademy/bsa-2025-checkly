import React, { useState } from "react";

import { TwinklesYellow } from "~/assets/img/shared/shapes/shapes.img.js";
import { DecorativeImage } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { CategoryItem } from "~/pages/home/components/categories/category-item/category-item.js";
import { categories } from "~/pages/home/components/categories/libs/constants.js";

import styles from "./styles.module.css";

const Categories: React.FC = () => {
	const [activeCategory, setActiveCategory] = useState<null | string>(null);

	const handleCategoryClick = useCallback(
		(category: string) => {
			setActiveCategory(activeCategory === category ? null : category);
		},
		[activeCategory],
	);

	const twinklesClasses = getClassNames(
		styles["image-position"],
		styles["yellow-stars"],
	);

	return (
		<section className={getClassNames("grid-pattern", styles["categories"])}>
			<div className={getClassNames("wrapper flow", styles["container"])}>
				<h2 className={styles["title"]}>Categories</h2>
				<div>
					<ul className="cluster" data-list>
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
			</div>
			<DecorativeImage className={twinklesClasses} src={TwinklesYellow} />
		</section>
	);
};

export { Categories };
