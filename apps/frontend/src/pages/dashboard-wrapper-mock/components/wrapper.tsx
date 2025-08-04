import { type JSX } from "react";
import { useLocation } from "react-router-dom";

import { AppHeader } from "~/libs/components/components.js";
import { SidePanel } from "~/libs/components/side-panel/side-panel.js";
import { AppRoute } from "~/libs/enums/enums.js";

import styles from "../styles.module.css";
import { Dashboard } from "./dashboard.js";
import { Plan } from "./plan.js";

const Wrapper: React.FC = () => {
	const { pathname } = useLocation();

	const getPage = (path: string): JSX.Element => {
		switch (path) {
			case AppRoute.DASHBOARD: {
				return <Dashboard />;
			}

			case AppRoute.PLAN: {
				return <Plan />;
			}
		}

		return <></>;
	};

	return (
		<>
			<AppHeader />
			<div className={styles["wrapper"]}>
				<SidePanel />
				{getPage(pathname)}
			</div>
		</>
	);
};

export { Wrapper };
