import { type FC } from "react";

import { PlanBig } from "~/assets/img/shared/illustrations/layouts/layouts.img.js";
import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";

import styles from "./styles.module.css";

const CurrentPlan: FC = () => {

	return (
		<div className={styles["container"]}>
			<h2 className={styles["title"]}>Current active plan</h2>
			<div className={styles["plan-card"]}>
				<img
					alt="Current Plan Card"
					className={styles["plan-image"]}
					src={PlanBig}
				/>
			</div>
			<div className={styles["continue-button"]}>
				<Link asButtonSize="small" asButtonVariant="primary" to={AppRoute.PLAN}>Continue</Link>
			</div>
		</div>
	);
};

export { CurrentPlan };
