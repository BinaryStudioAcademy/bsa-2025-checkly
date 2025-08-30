import { FbIcon, IgIcon, YtIcon } from "~/assets/img/footer/footer.img.js";
import { Link, Logo } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

const Footer: React.FC = () => {
	return (
		<footer className={getClassNames("grid-pattern", styles["footer"])}>
			<div className={getClassNames("wrapper cluster", styles["container"])}>
				<div className={getClassNames("cluster", styles["nav-container"])}>
					<Logo />
					<nav
						aria-label="Footer navigation"
						className={getClassNames("cluster", styles["nav-links"])}
					>
						<Link to={AppRoute.TERMS_OF_SERVICE}>Terms of Service</Link>
						<Link to={AppRoute.PRIVACY_POLICY}>Privacy Policy</Link>
						<Link to={AppRoute.CONTACT_US}>Contact Us</Link>
					</nav>
				</div>
				<nav
					aria-label="Social links"
					className={getClassNames("cluster", styles["social-links"])}
				>
					<Link aria-label="Instagram" to={AppRoute.IG}>
						<IgIcon aria-hidden="true" />
					</Link>
					<Link aria-label="Facebook" to={AppRoute.FB}>
						<FbIcon aria-hidden="true" />
					</Link>
					<Link aria-label="YouTube" to={AppRoute.YT}>
						<YtIcon aria-hidden="true" />
					</Link>
				</nav>
			</div>
		</footer>
	);
};

export { Footer };
