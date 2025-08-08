import { type FC } from "react";

import { CreateDoc } from "~/assets/img/icons/icons.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { Button } from "../button/button.js";
import styles from "./styles.module.css";

const Greeting: FC = () => {
	const user = useAppSelector((state) => state.auth.user);

	return (
		<div className={styles["container"]}>
			<h2 className={styles["greeting"]}>Hey {user?.name} 👋</h2>
			<Button
				className={styles["button"]}
				// disabled
				icon={<CreateDoc className={styles["largeIcon"]} />}
				label="Create New Plan"
				size="large"
				variant="primary"
			/>
		</div>
	);
};

export { Greeting };
