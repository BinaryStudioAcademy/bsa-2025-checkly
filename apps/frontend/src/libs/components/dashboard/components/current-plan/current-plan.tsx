import { type FC } from "react";

import { Link } from "~/libs/components/components.js";
import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";

import styles from "./styles.module.css";

const CurrentPlan: FC = () => {
	return (
		<div className={styles["container"]}>
			<h2 className={styles["title"]}>Current active plan</h2>
			<div className={styles["plan-card"]}>
				<PlanStyle inputStyle="WITH_REMARKS" />
			</div>
			<div className={styles["continue-button"]}>
				<Link asButtonSize="small" asButtonVariant="primary" to={AppRoute.PLAN}>
					Continue
				</Link>
			</div>
		</div>
	);
};

export { CurrentPlan };
