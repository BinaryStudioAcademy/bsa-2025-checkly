import { type FC } from "react";

import { PlanBig } from "~/assets/img/shared/illustrations/layouts/layouts.img.js";

import { Button } from "../button/button.js";
import styles from "./styles.module.css";

const CurrentPlan: FC = () => {
	return (
		<div className={styles["container"]}>
			<h2 className={styles["title"]}>Current active plan</h2>
			<div className={styles["planCard"]}>
				<img
					alt="Current Plan Card"
					className={styles["planImage"]}
					src={PlanBig}
				/>
			</div>
			<Button className={styles["actionButton"]} label="CONTINUE" />
		</div>
	);
};

export { CurrentPlan };
