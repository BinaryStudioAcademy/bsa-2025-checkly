import { type FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Link } from "~/libs/components/components.js";
import { ZERO } from "~/libs/components/dashboard/components/libs/enums/enums.js";
import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames, getPlanStyleName } from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { useAppDispatch } from "~/libs/hooks/use-app-dispatch/use-app-dispatch.hook.js";
import { CURRENT_PLAN_MESSAGES } from "~/modules/plans/libs/constants/plan.constants.js";
import { planApi, type PlanDaysTaskDto } from "~/modules/plans/plans.js";
import { actions } from "~/modules/plans/slices/plan.slice.js";

import styles from "./styles.module.css";

const CurrentPlan: FC = () => {
	const [currentPlan, setCurrentPlan] = useState<null | PlanDaysTaskDto>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<null | string>(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCurrentPlan = async (): Promise<void> => {
			try {
				const plans = await planApi.getAllUserPlans();

				if (plans.length === ZERO) {
					setCurrentPlan(null);

					return;
				}

				const maxId = Math.max(...plans.map((p) => p.id));
				const latestPlan = plans.find((plan) => plan.id === maxId) ?? null;

				setCurrentPlan(latestPlan);
			} catch {
				setErrorMessage(CURRENT_PLAN_MESSAGES.FAILED_TO_FETCH_CURRENT_PLAN);
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
					<div>{CURRENT_PLAN_MESSAGES.LOADING}</div>
				</div>
			</div>
		);
	}

	if (errorMessage) {
		return (
			<div className={getClassNames("flow-loose", styles["container"])}>
				<h2 className={styles["title"]}>Current active plan</h2>
				<div className={styles["plan-card"]}>
					<div>{errorMessage}</div>
				</div>
			</div>
		);
	}

	if (!currentPlan) {
		return (
			<div className={getClassNames("flow-loose", styles["container"])}>
				<h2 className={styles["title"]}>Current active plan</h2>
				<div className={styles["plan-card"]}>
					<div>{CURRENT_PLAN_MESSAGES.NO_ACTIVE_PLAN}</div>
				</div>
				<div className={styles["button-wrapper"]}>
					<Link
						asButtonSize="small"
						asButtonVariant="primary"
						to={AppRoute.QUIZ}
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
					inputStyle={getPlanStyleName(currentPlan.styleId)}
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
