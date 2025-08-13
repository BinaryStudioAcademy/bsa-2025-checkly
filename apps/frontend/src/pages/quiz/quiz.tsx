import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
	Arrow,
	StarsPink01,
	StarsYellow01,
	TwinklesYellow,
} from "~/assets/img/shared/shapes/shapes.img.js";
import { Button, DecorativeImage } from "~/libs/components/components.js";
import { AppRoute, ButtonLabels, ButtonVariants } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { type QuizCategoryValue } from "~/modules/quiz/libs/types/types.js";
import { actions } from "~/modules/quiz/quiz.js";
import { QuizCategoryCard } from "~/pages/quiz/components/quiz-category-card/quiz-category-card.js";
import { QUIZ_CATEGORIES } from "~/pages/quiz/mock-data/index.js";

import styles from "./styles.module.css";

const Quiz: React.FC = (): React.ReactElement => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { selectedCategory } = useAppSelector((state) => state.quiz);

	const handleCategorySelect = useCallback(
		(category: QuizCategoryValue): void => {
			dispatch(actions.setCategory(category));
		},
		[dispatch],
	);

	const handleNext = useCallback((): void => {
		const redirect = async (): Promise<void> => {
			if (selectedCategory) {
				await navigate(AppRoute.QUIZ_QUESTIONS);
			}
		};

		void redirect();
	}, [selectedCategory, navigate]);

	const createHandleSelect = useCallback(
		(category: QuizCategoryValue): (() => void) => {
			return (): void => {
				handleCategorySelect(category);
			};
		},
		[handleCategorySelect],
	);

	return (
		<div
			className={getClassNames("grid-pattern", styles["quiz-page-container"])}
		>
			<main className={styles["main"]}>
				<DecorativeImage
					className={getClassNames(
						styles["twinkle-stars"] || "",
						"show-tablet-up",
					)}
					src={TwinklesYellow}
				/>
				<DecorativeImage
					className={getClassNames(
						styles["yellow-stars"] || "",
						"show-tablet-up",
					)}
					src={StarsYellow01}
				/>
				<DecorativeImage
					className={getClassNames(
						styles["pink-stars"] || "",
						"show-tablet-up",
					)}
					src={StarsPink01}
				/>
				<DecorativeImage
					className={getClassNames(
						styles["quiz-arrow"] || "",
						"show-tablet-up",
					)}
					src={Arrow}
				/>

				<div className={getClassNames("wrapper", styles["wrapper"])}>
					<div className="flow-loose">
						<h1 className={styles["title"]}>
							Pick the field you&apos;d like to improve
						</h1>

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
								label={ButtonLabels.NEXT}
								onClick={handleNext}
								variant={ButtonVariants.PRIMARY}
							/>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export { Quiz };
