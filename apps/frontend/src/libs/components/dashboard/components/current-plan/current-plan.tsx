import { type FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Link } from "~/libs/components/components.js";
import { ZERO } from "~/libs/components/dashboard/components/libs/enums/enums.js";
import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { useAppDispatch } from "~/libs/hooks/use-app-dispatch/use-app-dispatch.hook.js";
import { type PlanStyleOption } from "~/libs/types/types.js";
import {
	DEFAULT_PLAN_STYLE,
	PLAN_STYLE_MAPPING,
} from "~/modules/plan-styles/libs/constants/plan-style.constants.js";
import { PLAN_CONSTANTS } from "~/modules/plans/libs/constants/plan.constants.js";
import { planApi, type PlanDaysTaskDto } from "~/modules/plans/plans.js";
import { actions } from "~/modules/plans/slices/plan.slice.js";

import styles from "./styles.module.css";

const getStyleName = (styleId: number): PlanStyleOption => {
	return PLAN_STYLE_MAPPING[styleId] ?? DEFAULT_PLAN_STYLE;
};

const CurrentPlan: FC = () => {
	const [currentPlan, setCurrentPlan] = useState<null | PlanDaysTaskDto>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<null | string>(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCurrentPlan = async (): Promise<void> => {
			try {
				const plans = await planApi.getAllUserPlans();
				const latestPlan = plans[ZERO] ?? null;
				setCurrentPlan(latestPlan);
			} catch {
				setError(PLAN_CONSTANTS.MESSAGES.FAILED_TO_FETCH_CURRENT_PLAN);
			} finally {
				setIsLoading(false);
			}
		};

		void fetchCurrentPlan();
	}, []);

	const handleContinue = useCallback((): void => {
		if (currentPlan) {
			dispatch(actions.setPlan(currentPlan));
			void navigate(AppRoute.PLAN);
		}
	}, [currentPlan, dispatch, navigate]);

	if (isLoading) {
		return (
			<div className={getClassNames("flow-loose", styles["container"])}>
				<h2 className={styles["title"]}>Current active plan</h2>
				<div className={styles["plan-card"]}>
					<div>{PLAN_CONSTANTS.MESSAGES.LOADING}</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className={getClassNames("flow-loose", styles["container"])}>
				<h2 className={styles["title"]}>Current active plan</h2>
				<div className={styles["plan-card"]}>
					<div>{error}</div>
				</div>
			</div>
		);
	}

	if (!currentPlan) {
		return (
			<div className={getClassNames("flow-loose", styles["container"])}>
				<h2 className={styles["title"]}>Current active plan</h2>
				<div className={styles["plan-card"]}>
					<div>{PLAN_CONSTANTS.MESSAGES.NO_ACTIVE_PLAN}</div>
				</div>
				<div className={styles["button-wrapper"]}>
					<Link
						asButtonSize="small"
						asButtonVariant="primary"
						to={AppRoute.PLAN}
					>
						Create Plan
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className={getClassNames("flow-loose", styles["container"])}>
			<h2 className={styles["title"]}>Current active plan</h2>
			<div className={styles["plan-card"]}>
				<PlanStyle
					inputStyle={getStyleName(currentPlan.styleId)}
					planTitle={currentPlan.title}
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
