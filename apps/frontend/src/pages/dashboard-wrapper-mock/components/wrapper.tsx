import { Outlet } from "react-router-dom";

import { AppHeader } from "~/libs/components/components.js";
import { SidePanel } from "~/libs/components/side-panel/side-panel.js";

import styles from "../styles.module.css";

const Wrapper: React.FC = () => {
	return (
		<>
			<AppHeader />
			<div className={styles["wrapper"]}>
				<SidePanel />
				<Outlet />
			</div>
		</>
	);
};

export { Wrapper };
