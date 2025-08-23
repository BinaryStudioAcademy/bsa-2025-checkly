import React, { type JSX, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
	Arrow,
	StarsPink01,
	StarsYellow01,
	TwinklesYellow,
} from "~/assets/img/shared/shapes/shapes.img.js";
import { Button, DecorativeImage, Link } from "~/libs/components/components.js";
import {
	AppRoute,
	ButtonLabels,
	ButtonSizes,
	ButtonVariants,
	ZERO,
} from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import {
	actions as planActions,
	type PlanCategoryWithColorDto,
} from "~/modules/plan-categories/plan-categories.js";
import { actions } from "~/modules/quiz/quiz.js";
import { QuizCategoryCard } from "~/pages/quiz/components/quiz-category-card/quiz-category-card.js";

import styles from "./styles.module.css";

const Quiz: React.FC = (): React.ReactElement => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		void dispatch(planActions.getAll());
	}, [dispatch]);

	const { planCategories } = useAppSelector((state) => state.planCategory);
	const { selectedCategory } = useAppSelector((state) => state.quiz);

	const handleCategorySelect = useCallback(
		(category: string): void => {
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

	const handleSelect = useCallback(
		(category: string): (() => void) => {
			return (): void => {
				handleCategorySelect(category);
			};
		},
		[handleCategorySelect],
	);

	const renderCategories = (
		categories: PlanCategoryWithColorDto[],
	): JSX.Element[] => {
		return categories.map((category) => (
			<QuizCategoryCard
				color={category.color}
				iconHref={category.iconHref}
				key={category.id}
				onSelect={handleSelect(category.key)}
				selected={selectedCategory === category.key}
				title={category.title}
			/>
		));
	};

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

				<div className={getClassNames("wrapper", styles["quiz-wrapper"])}>
					<div className="flow">
						<h1 className={styles["title"]}>
							Pick the field you&apos;d like to improve
						</h1>

						<div
							className={getClassNames("grid", styles["quiz-cards-container"])}
						>
							{planCategories.length > ZERO && renderCategories(planCategories)}
						</div>

						<div className={getClassNames("cluster", styles["actions"])}>
							<Link
								asButtonSize={ButtonSizes.LARGE}
								asButtonVariant={ButtonVariants.TRANSPARENT}
								to={AppRoute.ROOT}
							>
								{ButtonLabels.BACK_TO_MAIN_PAGE}
							</Link>
							<Button
								isDisabled={!selectedCategory}
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
