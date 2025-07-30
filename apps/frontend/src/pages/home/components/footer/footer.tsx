import {
	FbIcon,
	IgIcon,
	Logo,
	YtIcon
} from "../../../../assets/img/footer/index.js"; 
import { Link } from "../../../../libs/components/components.js";
import styles from "./styles.module.css";

const Footer: React.FC = () => {
	return (
		<footer className={styles["footer"]}>
			<div className={styles["logo-wrapper"]}>
				<Link to="/">
					<Logo />
				</Link>
			</div>

			<nav className={styles["nav-links"]}>
				<Link to="/">Terms of Service</Link>
				<Link to="/">Privacy Policy</Link>
				<Link to="/">Contact Us</Link>
			</nav>

			<nav className={styles["social-links"]}>
				<Link aria-label="Instagram" to="/">
					<IgIcon />
				</Link>
				<br />
				<Link aria-label="Facebook" to="/">
					<FbIcon />
				</Link>
				<br />
				<Link aria-label="YouTube" to="/">
					<YtIcon />
				</Link>
			</nav>
		</footer>
	);
};

export { Footer };
