import { type FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "~/libs/components/components.js";
import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { getClassNames, getPlanStyleName } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import { CURRENT_PLAN_MESSAGES } from "~/modules/plans/libs/constants/plan.constants.js";
import { type PlanWithCategoryDto } from "~/modules/plans/libs/types/types.js";
import { actions as planActions } from "~/modules/plans/plans.js";

import styles from "./styles.module.css";

const CurrentPlan: FC = () => {
	const dispatch = useAppDispatch();
	const currentPlan = useAppSelector(({ plan }) => plan.plan);
	const userPlansStatus = useAppSelector(
		({ plan }) => plan.userPlansDataStatus,
	);
	const navigate = useNavigate();
	const isLoading =
		userPlansStatus === DataStatus.PENDING ||
		userPlansStatus === DataStatus.IDLE;

	useEffect(() => {
		if (!currentPlan) {
			void dispatch(planActions.getPlan());
		}
	}, [dispatch, currentPlan]);

	const handleContinue = useCallback((): void => {
		dispatch(planActions.setCurrentPlan(currentPlan as PlanWithCategoryDto));
		void navigate(AppRoute.PLAN);
	}, [currentPlan, dispatch, navigate]);

	if (isLoading) {
		return (
			<div className={getClassNames("flow-loose", styles["container"])}>
				<h2 className={styles["title"]}>You have no plans yet</h2>
				<div className={styles["plan-card"]}>
					<div>{CURRENT_PLAN_MESSAGES.LOADING}</div>
				</div>
			</div>
		);
	}

	if (!currentPlan) {
		return (
			<div className={getClassNames("flow-loose", styles["container"])}>
				<h2 className={styles["title"]}>You have no plans yet</h2>
			</div>
		);
	}

	return (
		<div className={getClassNames("flow-loose", styles["container"])}>
			<h2 className={styles["title"]}>Current active plan</h2>
			<div className={styles["plan-card"]}>
				<PlanStyle
					inputStyle={getPlanStyleName(currentPlan.styleId)}
					plan={currentPlan}
				/>
			</div>
			<div className={styles["button-wrapper"]}>
				<Button
					label="Continue"
					onClick={handleContinue}
					size="small"
					variant="primary"
				/>
			</div>
		</div>
	);
};

export { CurrentPlan };
