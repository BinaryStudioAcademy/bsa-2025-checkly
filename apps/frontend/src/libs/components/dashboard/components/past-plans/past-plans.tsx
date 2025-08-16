import React, { type FC, useCallback, useEffect, useState } from "react";
import { DataStatus } from "shared";

import { Search } from "~/assets/img/icons/icons.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { getAllUserPlans, searchPlan } from "~/modules/plans/slices/actions.js";

import styles from "./styles.module.css";

const planCategories = [
	{
		id: 0,
		title: "All categories",
	},
	{
		id: 1,
		title: "Personal development",
	},
	{
		id: 2,
		title: "Spirituality",
	},
	{
		id: 3,
		title: "Sport",
	},
	{
		id: 4,
		title: "Money",
	},
	{
		id: 5,
		title: "Creativity",
	},
	{
		id: 6,
		title: "Hobby",
	},
];

const ZERO_CATEGORY_ID = 0;

const PastPlans: FC = () => {
	const dispatch = useAppDispatch();
	const [categoryId, setCategoryId] = useState<number>(ZERO_CATEGORY_ID);
	const [title, setTitle] = useState<string>("");

	const { userPlans, userPlansDataStatus } = useAppSelector(
		(state) => state.plan,
	);

	const isUserPlansLoading = userPlansDataStatus === DataStatus.PENDING;

	useEffect(() => {
		const isCategoryIdSelected = categoryId !== ZERO_CATEGORY_ID;
		const hasFilters = isCategoryIdSelected || !!title.trim();

		if (hasFilters) {
			void dispatch(
				searchPlan({
					categoryId: categoryId === ZERO_CATEGORY_ID ? undefined : categoryId,
					title: title.trim() || undefined,
				}),
			);
		} else {
			void dispatch(getAllUserPlans());
		}
	}, [categoryId, title, dispatch]);

	const handleCategoryChange = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>): void => {
			const id = Number(event.target.value);
			setCategoryId(id);
		},
		[],
	);

	const handleTitleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			setTitle(event.target.value);
		},
		[],
	);

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
					<select
						className={styles["search-select"]}
						id="category-select"
						name="planCategory"
						onChange={handleCategoryChange}
						value={categoryId}
					>
						<option defaultChecked disabled value="">
							Select category
						</option>
						{planCategories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.title}
							</option>
						))}
					</select>
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
			<div className={styles["plans-grid"]}>
				{isUserPlansLoading
					? null
					: userPlans.map((plan) => (
							<div className={styles["plan-card"]} key={plan.id}>
								<p>{plan.title}</p>
							</div>
						))}
			</div>
		</div>
	);
};

export { PastPlans };
