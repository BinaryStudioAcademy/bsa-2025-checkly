import { Link } from "~/libs/components/components.js";
import { Logo } from "~/libs/components/logo/logo.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

const Header: React.FC = () => {
	const { user } = useAppSelector(({ auth }) => auth);

	return (
		<header className={styles["header"]}>
			<div className="wrapper repel">
				<Logo />
				<nav className="cluster">
					<Link asButtonVariant="secondary" to={AppRoute.QUIZ}>
						Start quiz
					</Link>
					{user ? (
						<Link asButtonVariant="secondary" to={AppRoute.DASHBOARD}>
							Profile
						</Link>
					) : (
						<Link asButtonVariant="secondary" to={AppRoute.SIGN_IN}>
							Sign in
						</Link>
					)}
				</nav>
			</div>
		</header>
	);
};

export { Header };
