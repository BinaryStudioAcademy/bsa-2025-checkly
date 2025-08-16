import { type FC } from "react";

import { Link } from "~/libs/components/components.js";
import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

const CurrentPlan: FC = () => {
	return (
		<div className={getClassNames("cluster", styles["container"])}>
			<h2 className={styles["title"]}>Current active plan</h2>
			<div className={styles["plan-card"]}>
				<PlanStyle inputStyle="withremarks" />
			</div>
			<Link
				asButtonSize="small"
				asButtonVariant="primary"
				className={getClassNames(styles["continue-button"])}
				to={AppRoute.PLAN}
			>
				Continue
			</Link>
		</div>
	);
};

export { CurrentPlan };
