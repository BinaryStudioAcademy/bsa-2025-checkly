import { type FC } from "react";

import { CreateDoc } from "~/assets/img/icons/icons.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { CreatePlanButton } from "../create-plan-button/create-plan-button.js";
import styles from "./styles.module.css";

const handleCreatePlan = (): void => {};

const Greeting: FC = () => {
	const user = useAppSelector((state) => state.auth.user);

	return (
		<div className={styles["container"]}>
			<h2 className={styles["greeting"]}>Hey {user?.name} 👋</h2>
			<CreatePlanButton
				className={styles["button"] ?? ""}
				disabled
				icon={<CreateDoc className={styles["large-icon"]} />}
				label="Create New Plan"
				onClick={handleCreatePlan}
			/>
		</div>
	);
};

export { Greeting };
