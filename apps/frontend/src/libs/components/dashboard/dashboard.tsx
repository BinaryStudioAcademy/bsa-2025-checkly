import { type FC } from "react";

import { getClassNames } from "~/libs/helpers/get-class-names.js";

import { CurrentPlan } from "./components/current-plan/current-plan.js";
import { Greeting } from "./components/greeting/greeting.js";
import { PastPlans } from "./components/past-plans/past-plans.js";
import styles from "./styles.module.css";

const Dashboard: FC = () => {
	return (
		<div className={getClassNames(styles["dashboard"], "grid-pattern")}>
			<div className={getClassNames("wrapper", styles["content"])}>
				<Greeting />
				<div className={styles["content-grid"]}>
					<CurrentPlan />
					<PastPlans />
				</div>
			</div>
		</div>
	);
};

export { Dashboard };
