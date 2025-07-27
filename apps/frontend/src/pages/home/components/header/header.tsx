import { logoIcon } from "~/assets/img/home/header/home-header.img.js";
import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";

import styles from "./styles.module.css";

const Header: React.FC = () => {
	return (
		<header className={styles["header"]}>
			<div
				className="wrapper repel"
				style={{ "--repel-wrap": "nowrap" } as React.CSSProperties}
			>
				<div className="cluster">
					<img alt="Logo icon" src={logoIcon} />
					<p>Checkly</p>
				</div>
				<div className="cluster">
					<Link to={AppRoute.ROOT}>Start quiz</Link>
					<Link to={AppRoute.SIGN_IN}>Sign in</Link>
				</div>
			</div>
		</header>
	);
};

export { Header };
