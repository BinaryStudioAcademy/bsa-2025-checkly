import { useEffect, useState } from "react";

import { getAllUserPlans, searchPlan } from "~/modules/plans/slices/actions.js";

import { useAppDispatch, useAppSelector, useDebounce } from "../hooks.js";
import { DataStatus, ZERO_CATEGORY_ID } from "./libs/enums/enums.js";
import {
	type PlanDaysTaskDto,
	type PlanSearchQueryParameter,
} from "./libs/types/types.js";

const prepareSearchPayload = (
	categoryId?: number,
	title?: string,
): PlanSearchQueryParameter => ({
	categoryId: categoryId === ZERO_CATEGORY_ID ? undefined : categoryId,
	title: title?.trim() || undefined,
});

const useUserPlanSearch = (): {
	categoryId: number;
	isUserPlansLoading: boolean;
	setCategoryId: React.Dispatch<React.SetStateAction<number>>;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	title: string;
	userPlans: PlanDaysTaskDto[];
} => {
	const dispatch = useAppDispatch();
	const [categoryId, setCategoryId] = useState<number>(ZERO_CATEGORY_ID);
	const [title, setTitle] = useState<string>("");
	const debouncedTitle = useDebounce(title);

	const { userPlans, userPlansDataStatus } = useAppSelector(
		(state) => state.plan,
	);

	const isUserPlansLoading = userPlansDataStatus === DataStatus.PENDING;

	useEffect(() => {
		const isCategoryIdSelected = categoryId !== ZERO_CATEGORY_ID;
		const hasFilters = isCategoryIdSelected || !!debouncedTitle.trim();

		if (hasFilters) {
			void dispatch(
				searchPlan(prepareSearchPayload(categoryId, debouncedTitle)),
			);
		} else {
			void dispatch(getAllUserPlans());
		}
	}, [categoryId, debouncedTitle]);

	return {
		categoryId,
		isUserPlansLoading,
		setCategoryId,
		setTitle,
		title,
		userPlans,
	};
};

export { useUserPlanSearch };
