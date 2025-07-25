import { type JSX } from "react";

import { Nav } from "../components.js";
import styles from "./styles.module.css";

const Header = (): JSX.Element => {
	return (
		<div className={styles["header"]}>
			<header className="header wrapper repel">
				<span className={styles["header__logo"]}>Logo</span>
				<Nav />
			</header>
		</div>
	);
};

export { Header };
