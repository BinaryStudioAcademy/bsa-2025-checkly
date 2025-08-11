import { type FC } from "react";
import { Outlet } from "react-router-dom";

import { AppHeader } from "~/libs/components/components.js";
import { SidePanel } from "~/libs/components/side-panel/side-panel.js";

import styles from "./styles.module.css";

const DashboardWrapper: FC = () => {
	return (
		<div className={styles["app-container"]}>
			<AppHeader />
			<div className={styles["main-layout"]}>
				<SidePanel />
				<main className={styles["main-content"]}>
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export { DashboardWrapper };
