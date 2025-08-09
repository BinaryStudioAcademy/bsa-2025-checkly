import { FbIcon, IgIcon, YtIcon } from "~/assets/img/footer/index.js";
import { Link, Logo } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

const Footer: React.FC = () => {
	return (
		<footer className={getClassNames("grid-pattern", styles["footer"])}>
			<div className={getClassNames("wrapper cluster", styles["container"])}>
				<Logo />
				<nav
					aria-label="Footer navigation"
					className={getClassNames("cluster", styles["nav-links"])}
				>
					<Link to="/">Terms of Service</Link>
					<Link to="/">Privacy Policy</Link>
					<Link to="/">Contact Us</Link>
				</nav>
				<nav
					aria-label="Social links"
					className={getClassNames("cluster", styles["social-links"])}
				>
					<Link aria-label="Instagram" to="/">
						<IgIcon aria-hidden="true" />
					</Link>
					<Link aria-label="Facebook" to="/">
						<FbIcon aria-hidden="true" />
					</Link>
					<Link aria-label="YouTube" to="/">
						<YtIcon aria-hidden="true" />
					</Link>
				</nav>
			</div>
		</footer>
	);
};

export { Footer };
