import { type FC } from "react";

import { CreateDoc } from "~/assets/img/icons/icons.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { CreateButton } from "../create-button/create-button.js";
import styles from "./styles.module.css";

const Greeting: FC = () => {
	const user = useAppSelector((state) => state.auth.user);

	return (
		<div className={styles["container"]}>
			<h2 className={styles["greeting"]}>Hey {user?.name} 👋</h2>
			<CreateButton
				className={styles["button"] ?? ""}
				disabled
				icon={<CreateDoc className={styles["large-icon"]} />}
				label="Create New Plan"
			/>
		</div>
	);
};

export { Greeting };
