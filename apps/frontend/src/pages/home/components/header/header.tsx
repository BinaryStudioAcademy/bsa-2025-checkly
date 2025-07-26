import { logoIcon } from "~/assets/img/home/header/home-header.img.js";
import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

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
					<div className={getClassNames(styles["links-wrapper"], "cluster")}>
						<Link to={AppRoute.ROOT}>Start quiz</Link>
						<Link to={AppRoute.SIGN_IN}>Sign in</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export { Header };
