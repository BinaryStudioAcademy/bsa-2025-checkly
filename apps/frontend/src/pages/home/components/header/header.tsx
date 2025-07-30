import { Link } from "~/libs/components/components.js";
import { Logo } from "~/libs/components/logo/logo.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";

import styles from "./styles.module.css";

const Header: React.FC = () => {
	return (
		<header className={styles["header"]}>
			<div className="wrapper repel">
				<Logo />
				<nav className="cluster">
					<Link asButtonVariant="secondary" to={AppRoute.ROOT}>
						Start quiz
					</Link>
					<Link asButtonVariant="secondary" to={AppRoute.SIGN_IN}>
						Sign in
					</Link>
				</nav>
			</div>
		</header>
	);
};

export { Header };
