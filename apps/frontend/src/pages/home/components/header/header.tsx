import { Link } from "~/libs/components/components.js";
import { Logo } from "~/libs/components/logo/logo.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";

import styles from "./styles.module.css";

const Header: React.FC = () => {
	return (
		<header className={styles["header"]}>
			<div className="wrapper repel">
				<Logo />
				<div className="cluster">
					<Link to={AppRoute.ROOT}>Start quiz</Link>
					<Link to={AppRoute.SIGN_IN}>Sign in</Link>
				</div>
			</div>
		</header>
	);
};

export { Header };
