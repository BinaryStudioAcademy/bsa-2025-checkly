import React, { type JSX, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
	Arrow,
	StarsPink01,
	StarsYellow01,
	TwinklesYellow,
} from "~/assets/img/shared/shapes/shapes.img.js";
import { Button, DecorativeImage } from "~/libs/components/components.js";
import { SKELETON_COUNT } from "~/libs/constants/category-skeleton-count.js";
import {
	AppRoute,
	ButtonLabels,
	ButtonVariants,
	ZERO,
} from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { storage, StorageKey } from "~/libs/modules/storage/storage.js";
import {
	actions as planActions,
	type PlanCategoryWithColorDto,
} from "~/modules/plan-categories/plan-categories.js";
import { actions } from "~/modules/quiz-questions/quiz-questions.js";
import { QuizCategoryCard } from "~/pages/quiz/components/quiz-category-card/quiz-category-card.js";

import { QuizCategoryCardSkeleton } from "./components/quiz-category-card/quiz-category-card-skeleton.js";
import styles from "./styles.module.css";

const Quiz: React.FC = (): React.ReactElement => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		void dispatch(planActions.getAll());
	}, [dispatch]);

	const { dataStatus: planCategoriesDataStatus, planCategories } =
		useAppSelector((state) => state.planCategory);
	const { selectedCategory } = useAppSelector((state) => state.quizQuestion);

	const handleCategorySelect = useCallback(
		(clickedCategory: string): void => {
			if (clickedCategory !== selectedCategory) {
				const clearStateAndSetCategory = async (): Promise<void> => {
					await storage.drop(StorageKey.QUIZ_STATE);
					dispatch(actions.resetQuiz());
					dispatch(actions.setCategory(clickedCategory));
				};

				void clearStateAndSetCategory();
			}
		},
		[dispatch, selectedCategory],
	);

	const handleBack = useCallback((): void => {
		const redirect = async (): Promise<void> => {
			await navigate(AppRoute.ROOT);
		};

		void redirect();
	}, [navigate]);

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
		if (planCategoriesDataStatus.length === ZERO) {
			return Array.from({ length: SKELETON_COUNT }, (_, index) => (
				<QuizCategoryCardSkeleton key={`skeleton-${String(index)}`} />
			));
		}

		return categories.map((category) => (
			<QuizCategoryCard
				color={category.color}
				iconHref={category.iconHref}
				isSelected={category.key === selectedCategory}
				key={category.id}
				onSelect={handleSelect(category.key)}
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
					<div className="flow-loose-xl">
						<h1 className={styles["title"]}>
							Pick the field you&apos;d like to improve
						</h1>

						<div
							className={getClassNames("grid", styles["quiz-cards-container"])}
						>
							{planCategories.length > ZERO && renderCategories(planCategories)}
						</div>

						<div className={getClassNames("cluster", styles["actions"])}>
							<Button
								label={ButtonLabels.BACK_TO_MAIN_PAGE}
								onClick={handleBack}
								variant={ButtonVariants.SECONDARY}
							/>
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
