import React, { type JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZERO } from "shared";

import { TwinklesYellow } from "~/assets/img/shared/shapes/shapes.img.js";
import {
	Button,
	DecorativeImage,
	Modal,
} from "~/libs/components/components.js";
import { SKELETON_COUNT } from "~/libs/constants/category-skeleton-count.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import {
	actions as planActions,
	type PlanCategoryWithColorDto,
} from "~/modules/plan-categories/plan-categories.js";
import { actions } from "~/modules/quiz/quiz.js";
import { QuizCategoryCardSkeleton } from "~/pages/quiz/components/quiz-category-card/quiz-category-card-skeleton.js";
import { QuizCategoryCard } from "~/pages/quiz/components/quiz-category-card/quiz-category-card.js";

import styles from "./styles.module.css";

const Categories: React.FC = () => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const { dataStatus: planCategoriesDataStatus, planCategories } =
		useAppSelector((state) => state.planCategory);
	const { selectedCategory } = useAppSelector((state) => state.quiz);

	useEffect(() => {
		void dispatch(planActions.getAll());
	}, [dispatch]);

	const twinklesClasses = getClassNames(
		styles["image-position"],
		styles["yellow-stars"],
	);

	const handleCategorySelect = useCallback(
		(category: string): void => {
			dispatch(actions.resetQuiz());
			dispatch(actions.setCategory(category));
		},
		[dispatch],
	);

	const handleModalOpen = useCallback((): void => {
		setIsModalOpen(true);
	}, []);

	const handleSelect = useCallback(
		(category: string): (() => void) => {
			return (): void => {
				handleCategorySelect(category);
				handleModalOpen();
			};
		},
		[handleModalOpen, handleCategorySelect],
	);

	const handleModalClose = useCallback((): void => {
		setIsModalOpen(false);
	}, []);

	const handleConfirm = useCallback((): void => {
		const redirect = async (): Promise<void> => {
			if (selectedCategory) {
				await navigate(AppRoute.QUIZ_QUESTIONS);
			}
		};

		void redirect();
	}, [selectedCategory, navigate]);

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
				isSelected={selectedCategory === category.key}
				key={category.id}
				onSelect={handleSelect(category.key)}
				title={category.title}
			/>
		));
	};

	const getCategoryData = (categoryKey: string): PlanCategoryWithColorDto => {
		const category = planCategories.find(
			(category) => category.key === categoryKey,
		);

		return category as PlanCategoryWithColorDto;
	};

	return (
		<section className={getClassNames("grid-pattern", styles["categories"])}>
			<div className={getClassNames("wrapper flow", styles["container"])}>
				<h2 className={styles["title"]}>Categories</h2>
				<div className={getClassNames("grid", styles["quiz-cards-container"])}>
					{planCategories.length > ZERO && renderCategories(planCategories)}
				</div>
			</div>
			<DecorativeImage className={twinklesClasses} src={TwinklesYellow} />
			{selectedCategory && (
				<Modal
					isOpen={isModalOpen}
					onClose={handleModalClose}
					title="Start quiz"
				>
					<div
						className={getClassNames("flow-loose-lg", styles["modal-wrapper"])}
					>
						<div className={getClassNames("cluster", styles["modal-content"])}>
							<DecorativeImage
								className={styles["modal-content-icon"]}
								src={getCategoryData(selectedCategory).iconHref}
							/>
							<div className="flow">
								<p>
									You&apos;ve selected the{" "}
									<span className={styles["modal-selected-category"]}>
										{getCategoryData(selectedCategory).title}
									</span>{" "}
									category. Would you like to start the quiz?
								</p>
							</div>
						</div>
						<div className="cluster">
							<Button
								label="Cancel"
								onClick={handleModalClose}
								variant="secondary"
							/>
							<Button
								label="Confirm"
								onClick={handleConfirm}
								variant="primary"
							/>
						</div>
					</div>
				</Modal>
			)}
		</section>
	);
};

export { Categories };
