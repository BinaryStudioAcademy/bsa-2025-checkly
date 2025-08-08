import { type FC } from "react";

import { getClassNames } from "~/libs/helpers/get-class-names.js";

import { CurrentPlan } from "./components/current-plan/current-plan.js";
import { Greeting } from "./components/greeting/greeting.js";
import { PastPlans } from "./components/past-plans/past-plans.js";
import styles from "./styles.module.css";

const classMainContent = getClassNames(
	"grid-pattern",
	styles["light-background"],
	styles["mainContent"],
);

const Dashboard: FC = () => {
	return (
		<main className={classMainContent}>
			<Greeting />
			<div className={styles["contentGrid"]}>
				<CurrentPlan />
				<PastPlans />
			</div>
		</main>
	);
};

export { Dashboard };
