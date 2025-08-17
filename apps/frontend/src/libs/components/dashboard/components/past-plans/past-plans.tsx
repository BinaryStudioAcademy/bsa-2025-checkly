import React, { type FC, useCallback, useEffect } from "react";
import { type SingleValue } from "react-select";

import { Search } from "~/assets/img/icons/icons.js";
import { Button, Loader } from "~/libs/components/components.js";
import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { ZERO } from "~/libs/constants/constants.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import {
	useAppDispatch,
	useAppSelector,
	useUserPlanSearch,
} from "~/libs/hooks/hooks.js";
import { actions as planCategoryActions } from "~/modules/plan-categories/plan-categories.js";

import { ZERO_CATEGORY_ID } from "../libs/enums/enums.js";
import { PlanCategorySelect } from "./components/plan-category-select/plan-category-select.js";
import { defaultCategoryOption } from "./libs/enums/enums.js";
import { type CategoryOption } from "./libs/types/types.js";
import styles from "./styles.module.css";

const PastPlans: FC = () => {
	const dispatch = useAppDispatch();
	const { planCategories } = useAppSelector((state) => state.planCategory);

	useEffect(() => {
		void dispatch(planCategoryActions.getAll());
	}, [dispatch]);

	const categoryOptions = [defaultCategoryOption, ...planCategories];
	const selectOptions: CategoryOption[] = categoryOptions.map((option) => ({
		label: option.title,
		value: option.id,
	}));

	const {
		categoryId,
		isUserPlansLoading,
		setCategoryId,
		setTitle,
		title,
		userPlans,
	} = useUserPlanSearch();

	const handleCategoryChange = useCallback(
		(selectedOption: SingleValue<CategoryOption>): void => {
			const id = selectedOption?.value ?? ZERO_CATEGORY_ID;
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
		setCategoryId(ZERO_CATEGORY_ID);
		setTitle("");
	}, [setCategoryId, setTitle]);

	const plansFoundAmount = userPlans.length;
	const selectedCategoryOption =
		selectOptions.find((option) => option.value === categoryId) ??
		selectOptions[ZERO];

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

				<div className={getClassNames("flow", styles["search-plans-item"])}>
					<label
						className={getClassNames("flow", styles["filter-label"])}
						htmlFor="search-input"
					>
						Search by title:
					</label>
					<div className={styles["search-input-container"]}>
						<input
							className={styles["search-input"]}
							id="search-input"
							onChange={handleTitleChange}
							placeholder="Enter plan title..."
							type="text"
							value={title}
						/>
						<Search className={styles["search-icon"]} />
					</div>
				</div>
			</div>
			<div className="repel">
				<p className={styles["plans-found"]}>
					Found: <span>{plansFoundAmount}</span>
				</p>
				<Button
					className={styles["clear-filters-button"]}
					label="Clear filters"
					onClick={handleClearFilters}
					size="small"
					variant="secondary"
				/>
			</div>
			<div className={getClassNames("grid", styles["plans-grid"])}>
				{isUserPlansLoading && userPlans.length === ZERO ? (
					<Loader container="inline" />
				) : (
					userPlans.map((plan) => (
						<div className={styles["plan-card"]} key={plan.id}>
							<PlanStyle inputStyle="withremarks" view="selection" />
						</div>
					))
				)}
			</div>
		</div>
	);
};

export { PastPlans };
