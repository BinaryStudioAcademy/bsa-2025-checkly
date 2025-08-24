import { type FC } from "react";

import { Link } from "~/libs/components/components.js";
import { PLAN_TEMPLATE } from "~/libs/components/plan-styles/mocks/plan-mocks.js";
import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

const CurrentPlan: FC = () => {
	const currentPlan = useAppSelector(({ plan }) => plan.plan) ?? PLAN_TEMPLATE;

	return (
		<div className={getClassNames("flow-loose", styles["container"])}>
			<h2 className={styles["title"]}>Current active plan</h2>
			<div className={styles["plan-card"]}>
				<PlanStyle inputStyle="WITH_REMARKS" plan={currentPlan} />
			</div>
			<div className={styles["button-wrapper"]}>
				<Link asButtonSize="small" asButtonVariant="primary" to={AppRoute.PLAN}>
					Continue
				</Link>
			</div>
		</div>
	);
};

export { CurrentPlan };
