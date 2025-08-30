import { type FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { CreateDoc } from "~/assets/img/icons/icons.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { CreatePlanButton } from "../create-plan-button/create-plan-button.js";
import styles from "./styles.module.css";

const Greeting: FC = () => {
	const navigate = useNavigate();
	const user = useAppSelector((state) => state.auth.user);

	const handleCreatePlan = useCallback((): void => {
		void navigate(AppRoute.QUIZ);
	}, [navigate]);

	return (
		<div className={styles["container"]}>
			<h2 className={styles["greeting"]}>Hey {user?.name} 👋</h2>
			<CreatePlanButton
				className={styles["button"] ?? ""}
				icon={<CreateDoc className={styles["large-icon"]} />}
				label="Create New Plan"
				onClick={handleCreatePlan}
			/>
		</div>
	);
};

export { Greeting };
