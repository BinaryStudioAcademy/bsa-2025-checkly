import { Link } from "react-router-dom";

import { logoIcon } from "~/assets/img/home/header/home-header.img.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";

import styles from "./styles.module.css";

const Header: React.FC = () => {
	return (
		<header className={styles["header"]}>
			<div className={styles["container"]}>
				<div className={styles["row"]}>
					<div className={styles["logo"]}>
						<img alt="Logo icon" src={logoIcon} />
						<p>Checkly</p>
					</div>
					<div className={styles["links-wrapper"]}>
						<Link className={styles["link"]} to={AppRoute.ROOT}>
							Start quiz
						</Link>
						<Link className={styles["link"]} to={AppRoute.SIGN_IN}>
							Sign In
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export { Header };
