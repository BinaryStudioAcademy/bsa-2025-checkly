import { CgProfile } from "react-icons/cg";

import { Dashboard, Plan } from "~/assets/img/side-panel/side-panel.img.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import { NavigationItem } from "../navigation-item/navigation-item.js";
import styles from "./styles.module.css";

const SidePanel: React.FC = () => {
	const asideClasses = getClassNames(styles["aside"], "show-desktop-up");

	return (
		<>
			<aside className={asideClasses}>
				<nav className={styles["navigation"]}>
					<ul className={styles["navigation__menu"]}>
						<NavigationItem
							buttonText="Dashboard"
							buttonType="side-panel"
							icon={<Dashboard />}
							navigateTo={AppRoute.DASHBOARD}
						/>
						<NavigationItem
							buttonText="My plan"
							buttonType="side-panel"
							icon={<Plan />}
							navigateTo={AppRoute.PLAN}
						/>
						<NavigationItem
							buttonText="Profile"
							buttonType="side-panel"
							icon={<CgProfile />}
							navigateTo={AppRoute.PROFILE}
						/>
					</ul>
				</nav>
			</aside>
		</>
	);
};

export { SidePanel };
