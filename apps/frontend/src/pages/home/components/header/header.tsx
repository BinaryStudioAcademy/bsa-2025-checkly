import { Nav } from "../components.js";
import styles from "./styles.module.css";

const Header: React.FC = () => {
	return (
		<header className={styles["header"]}>
			<div className="wrapper repel">
				<span className={styles["header__logo"]}>Logo</span>
				<Nav />
			</div>
		</header>
	);
};

export { Header };
