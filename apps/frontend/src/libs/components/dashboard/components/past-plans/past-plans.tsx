import React, { type FC, type JSX, useCallback, useEffect } from "react";
import { type SingleValue } from "react-select";

import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { ZERO } from "~/libs/constants/constants.js";
import { getClassNames, getPlanStyleName } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useUserPlanSearch,
} from "~/libs/hooks/hooks.js";
import { actions as planCategoryActions } from "~/modules/plan-categories/plan-categories.js";
import { type PlanWithCategoryDto } from "~/modules/plans/libs/types/types.js";
import { actions as planActions } from "~/modules/plans/plans.js";

import { PlanCategorySelect } from "./components/plan-category-select/plan-category-select.js";
import { PlanSearchInput } from "./components/plan-search-input/plan-search-input.js";
import { PlansFoundBlock } from "./components/plans-found-block/plans-found-block.js";
import { defaultCategoryOption } from "./libs/enums/enums.js";
import { type CategoryOption } from "./libs/types/types.js";
import styles from "./styles.module.css";

const PlanCardSkeleton: FC = () => (
	<div className={getClassNames("flow", styles["plan-card-skeleton"])}>
		<div className={styles["skeleton-title"]} />
		<div className={styles["skeleton-subtitle"]} />
		<div className={getClassNames("flow-tight", styles["skeleton-content"])}>
			<div className={styles["skeleton-line"]} />
			<div className={styles["skeleton-line-short"]} />
			<div className={styles["skeleton-line"]} />
			<div className={styles["skeleton-line-short"]} />
			<div className={styles["skeleton-line"]} />
			<div className={styles["skeleton-line-short"]} />
			<div className={styles["skeleton-line"]} />
			<div className={styles["skeleton-line-short"]} />
			<div className={styles["skeleton-line"]} />
		</div>
	</div>
);

const SKELETON_ELEMETS_COUNT = 6;

const renderSkeletonCards = (): JSX.Element => (
	<>
		{Array.from({ length: SKELETON_ELEMETS_COUNT }, (_, index) => (
			<PlanCardSkeleton key={`skeleton-${String(index)}`} />
		))}
	</>
);

const PastPlans: FC = () => {
	const dispatch = useAppDispatch();
	const { planCategories } = useAppSelector((state) => state.planCategory);

	useEffect(() => {
		void dispatch(planCategoryActions.getAll());
	}, [dispatch]);

	const {
		categoryId,
		isUserPlansLoading,
		setCategoryId,
		setTitle,
		title,
		userPlans,
	} = useUserPlanSearch();

	const categoryOptions = [defaultCategoryOption, ...planCategories];
	const selectOptions: CategoryOption[] = categoryOptions.map((option) => ({
		label: option.title,
		value: option.id,
	}));
	const plansFoundAmount = userPlans.length;
	const selectedCategoryOption =
		selectOptions.find((option) => option.value === categoryId) ??
		selectOptions[ZERO];

	const handleCategoryChange = useCallback(
		(selectedOption: SingleValue<CategoryOption>): void => {
			const id = selectedOption?.value ?? ZERO;
			setCategoryId(id);
		},
		[setCategoryId],
	);

	const handleTitleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			setTitle(event.target.value);
		},
		[setTitle],
	);

	const handleClearFilters = useCallback((): void => {
		setCategoryId(ZERO);
		setTitle("");
	}, [setCategoryId, setTitle]);

	const handlePlanSelect = useCallback(
		(event: React.MouseEvent<HTMLDivElement>): void => {
			const planId = Number.parseInt(
				event.currentTarget.dataset["planId"] as string,
			);
			const currentPlan = userPlans.find(
				(plan) => plan.id === planId,
			) as PlanWithCategoryDto;

			dispatch(planActions.setCurrentPlan(currentPlan));
		},
		[dispatch, userPlans],
	);

	const renderPlanCards = (): JSX.Element => (
		<>
			{userPlans.map((plan) => (
				<div
					aria-hidden="true"
					className={getClassNames(
						styles["plan-card"],
						styles[
							`plan-card__bg-${getPlanStyleName(plan.styleId).toLowerCase()}`
						],
					)}
					data-plan-id={plan.id}
					key={plan.id}
					onClick={handlePlanSelect}
					role="button"
				>
					<PlanStyle
						inputStyle={getPlanStyleName(plan.styleId)}
						plan={plan}
						view="selection"
					/>
				</div>
			))}
		</>
	);

	return (
		<div className={getClassNames("flow-loose", styles["container"])}>
			<h2 className={styles["title"]}>Past plans</h2>
			<div className={getClassNames("flow", styles["search-plans-container"])}>
				<PlanCategorySelect
					className={getClassNames("flow", styles["search-plans-item"])}
					onChange={handleCategoryChange}
					options={selectOptions}
					value={selectedCategoryOption}
				/>
				<PlanSearchInput
					className={getClassNames("flow", styles["search-plans-item"])}
					onChange={handleTitleChange}
					value={title}
				/>
			</div>
			<PlansFoundBlock
				className="repel"
				onClearFilters={handleClearFilters}
				plansFoundAmount={plansFoundAmount}
			/>
			<div className={getClassNames("grid", styles["plans-grid"])}>
				{isUserPlansLoading ? renderSkeletonCards() : renderPlanCards()}
			</div>
		</div>
	);
};

export { PastPlans };
