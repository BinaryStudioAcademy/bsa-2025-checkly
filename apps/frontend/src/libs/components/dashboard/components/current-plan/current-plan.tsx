import { type FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { PlanBig } from "~/assets/img/shared/illustrations/layouts/layouts.img.js";
import { Button } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";

import styles from "./styles.module.css";

const CurrentPlan: FC = () => {
	const navigate = useNavigate();

	const handleClick = useCallback((): void => {
		void (async (): Promise<void> => {
			await navigate(AppRoute.PLAN);
		})();
	}, [navigate]);

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
			<Button
				className={styles["action-button"] ?? ""}
				label="CONTINUE"
				onClick={handleClick}
			/>
		</div>
	);
};

export { CurrentPlan };
