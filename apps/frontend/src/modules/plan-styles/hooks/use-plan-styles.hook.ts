import { useEffect } from "react";

import { ZERO } from "~/libs/components/dashboard/components/libs/enums/enums.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { type PlanStyleDto } from "~/modules/plan-styles/libs/types/types.js";
import { actions } from "~/modules/plan-styles/slices/plan-style.js";

type UsePlanStyles = {
	isError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
	refetch: () => void;
	styles: PlanStyleDto[];
};

const usePlanStyles = (): UsePlanStyles => {
	const dispatch = useAppDispatch();
	const { dataStatus, styles } = useAppSelector((state) => state.planStyles);

	useEffect(() => {
		if (dataStatus === DataStatus.IDLE && styles.length === ZERO) {
			void dispatch(actions.fetchPlanStyles());
		}
	}, [dispatch, dataStatus, styles.length]);

	const isLoading = dataStatus === DataStatus.PENDING;
	const isError = dataStatus === DataStatus.REJECTED;
	const isSuccess = dataStatus === DataStatus.FULFILLED;

	return {
		isError,
		isLoading,
		isSuccess,
		refetch: (): void => {
			void dispatch(actions.fetchPlanStyles());
		},
		styles,
	};
};

export { usePlanStyles };
