import { type FC } from "react";
import { Outlet } from "react-router-dom";

import { AppHeader } from "~/libs/components/components.js";
import { SidePanel } from "~/libs/components/side-panel/side-panel.js";

import styles from "./styles.module.css";

const DashboardWrapper: FC = () => {
	return (
		<div className={styles["appContainer"]}>
			<AppHeader />
			<div className={styles["mainLayout"]}>
				<SidePanel />
				<Outlet />
			</div>
		</div>
	);
};

export { DashboardWrapper };
