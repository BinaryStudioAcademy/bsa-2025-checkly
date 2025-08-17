import React, { type FC, useCallback, useEffect } from "react";
import Select, {
	type GroupBase,
	type SingleValue,
	type StylesConfig,
} from "react-select";

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

import { ZERO_CATEGORY_ID } from "../libs/enums//enums.js";
import styles from "./styles.module.css";

type CategoryOption = {
	label: string;
	value: number;
};

const PastPlans: FC = () => {
	const dispatch = useAppDispatch();
	const { planCategories } = useAppSelector((state) => state.planCategory);

	useEffect(() => {
		void dispatch(planCategoryActions.getAll());
	}, [dispatch]);

	const defaultCategoryOption = {
		id: ZERO_CATEGORY_ID,
		title: "All categories",
	};

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

	const customSelectStyles: StylesConfig<
		CategoryOption,
		false,
		GroupBase<CategoryOption>
	> = {
		control: (provided, state) => ({
			...provided,
			"&:hover": {
				borderColor: "var(--color-bg-dark)",
			},
			"@media (width >= 768px)": {
				padding: "calc(var(--space-xs) * 0.5) var(--space-xs)",
			},
			backgroundColor: "var(--color-bg-light)",
			border: "2px solid var(--color-bg-dark)",
			borderRadius: "var(--radius-s)",
			boxShadow: state.isFocused
				? "0 0 0 4px var(--color-brand-muted)"
				: "none",
			cursor: "pointer",
			fontFamily: "inherit",
			fontSize: "inherit",
			fontWeight: "var(--font-weight-regular)",
			minHeight: "auto",
			padding: "0 var(--space-xs)",
			transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
			width: "100%",
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: "var(--color-bg-light)",
			border: "2px solid var(--color-bg-dark)",
			borderRadius: "var(--radius-s)",
		}),
		option: (provided, state) => {
			const getBackgroundColor = (): string => {
				if (state.isSelected) {
					return "var(--color-brand-muted)";
				} else if (state.isFocused) {
					return "var(--color-card-gray)";
				}

				return "transparent";
			};

			return {
				...provided,
				backgroundColor: getBackgroundColor(),
				color: "inherit",
				cursor: "pointer",
			};
		},
		singleValue: (provided) => ({
			...provided,
			color: "inherit",
		}),
	};

	return (
		<div className={getClassNames("flow-loose", styles["container"])}>
			<h2 className={styles["title"]}>Past plans</h2>

			<div
				className={getClassNames(
					"flow-loose",
					styles["search-plans-container"],
				)}
			>
				<div className={getClassNames("flow", styles["search-plans-item"])}>
					<label htmlFor="category-select">Select category:</label>
					<Select
						defaultValue={selectedCategoryOption}
						inputId="category-select"
						isClearable={false}
						isSearchable={false}
						onChange={handleCategoryChange}
						options={selectOptions}
						placeholder="Select category"
						styles={customSelectStyles}
						value={selectedCategoryOption}
					/>
				</div>

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
