import { FiUser } from "react-icons/fi";

import { Dashboard, Plan } from "~/assets/img/side-panel/side-panel.img.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { NavigationItem } from "../navigation-item/navigation-item.js";
import styles from "./styles.module.css";

const SidePanel: React.FC = () => {
	const user = useAppSelector((state) => state.auth.user);

	const asideClasses = getClassNames(styles["aside"], "show-desktop-up");

	return (
		<>
			<aside className={asideClasses}>
				<nav className={styles["navigation"]}>
					<ul className={styles["navigation__menu"]}>
						{user && (
							<NavigationItem
								buttonText="Dashboard"
								buttonType="side-panel"
								icon={<Dashboard />}
								navigateTo={AppRoute.DASHBOARD}
							/>
						)}
						<NavigationItem
							buttonText="My plan"
							buttonType="side-panel"
							icon={<Plan />}
							navigateTo={AppRoute.PLAN}
						/>
						{user && (
							<NavigationItem
								buttonText="Profile"
								buttonType="side-panel"
								icon={<FiUser />}
								navigateTo={AppRoute.PROFILE}
							/>
						)}
					</ul>
				</nav>
			</aside>
		</>
	);
};

export { SidePanel };
