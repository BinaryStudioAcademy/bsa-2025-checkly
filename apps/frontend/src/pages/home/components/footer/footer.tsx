import {
	FbIcon,
	IgIcon,
	Logo,
	YtIcon,
} from "~/assets/img/footer/footer.img.js";
import { Link } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const Footer: React.FC = () => {
	return (
		<footer className={styles["footer"]}>
			<div className={styles["logo-wrapper"]}>
				<Link to="/">
					<Logo className={styles["logo"]} />
				</Link>
			</div>

			<nav className={styles["nav-links"]}>
				<Link to="/">Terms of Service</Link>
				<Link to="/">Privacy Policy</Link>
				<Link to="/">Contact Us</Link>
			</nav>

			<nav className={styles["social-links"]}>
				<Link to="/">
					<IgIcon className={styles["social-icon"]} />
				</Link>
				<Link to="/">
					<FbIcon className={styles["social-icon"]} />
				</Link>
				<Link to="/">
					<YtIcon className={styles["social-icon"]} />
				</Link>
			</nav>
		</footer>
	);
};

export { Footer };
