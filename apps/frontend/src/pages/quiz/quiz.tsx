import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Arrow, StarsPink01, StarsYellow01, TwinklesYellow } from "~/assets/img/shared/shapes/shapes.img.js";
import { Button, DecorativeImage } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { type EnumValue, type QuizCategory } from "~/modules/quiz/libs/enums/enums.js";
import { actions } from "~/modules/quiz/quiz.js";

import { QuizCategoryCard } from "./components/quiz-category-card/quiz-category-card.js";
import { QUIZ_CATEGORIES } from "./mock-data/index.js";
import styles from "./styles.module.css";

const Quiz: React.FC = (): React.ReactElement => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	
	const { selectedCategory } = useAppSelector((state) => state.quiz);
	
	const safeNavigate = useCallback((path: string): void => {
		const result = navigate(path);

		if (result && typeof result.then === "function") {
			result.then(() => {}).catch(() => {});
		}
	}, [navigate]);
	
	const handleCategorySelect = useCallback((category: EnumValue<typeof QuizCategory>): void => {
		dispatch(actions.setCategory(category));
	}, [dispatch]);
	
	const handleNext = useCallback((): void => {
		if (selectedCategory) {
			safeNavigate(AppRoute.QUIZ_QUESTIONS);
		}
	}, [selectedCategory, safeNavigate]);
	
	const createHandleSelect = useCallback((category: EnumValue<typeof QuizCategory>) => {
		return (): void => {
			handleCategorySelect(category);
		};
	}, [handleCategorySelect]);
	
	return (
		<div className="grid-pattern">
			<main className={styles["main"]}>
				<DecorativeImage className={getClassNames(styles["twinkle-stars"] || "", "show-tablet-up")} src={TwinklesYellow} />
				<DecorativeImage className={getClassNames(styles["yellow-stars"] || "", "show-tablet-up")} src={StarsYellow01} />
				<DecorativeImage className={getClassNames(styles["pink-stars"] || "", "show-tablet-up")} src={StarsPink01} />
				<DecorativeImage className={getClassNames(styles["quiz-arrow"] || "", "show-tablet-up")} src={Arrow} />
				
				<div className={getClassNames("wrapper", styles["wrapper"])}>
					<div className="flow-loose">
						<h1 className={styles["title"]}>Pick the field you&apos;d like to improve</h1>
						
						<div className={getClassNames("cluster", styles["container"])}>
							{QUIZ_CATEGORIES.map((category) => (
								<QuizCategoryCard
									category={category.category}
									color={category.color}
									icon={category.icon}
									key={category.category}
									onSelect={createHandleSelect(category.category)}
									selected={selectedCategory === category.category}
								/>
							))}
						</div>
						
						<div className={getClassNames("cluster", styles["actions"])}>
							<Button
								disabled={!selectedCategory}
								label="NEXT"
								onClick={handleNext}
								variant="primary"
							/>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export { Quiz };