import { type FC } from "react";

import { PAST_PLANS } from "~/pages/home/lib/constants.js";

import styles from "./styles.module.css";

const PastPlans: FC = () => {
	return (
		<div className={styles["container"]}>
			<h2 className={styles["title"]}>Past plans</h2>
			<div className={styles["plans-grid"]}>
				{PAST_PLANS.map((plan) => (
					<div className={styles["plan-card"]} key={plan.id}>
						<img
							alt={plan.name}
							className={styles["plan-image"]}
							src={plan.path}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export { PastPlans };
