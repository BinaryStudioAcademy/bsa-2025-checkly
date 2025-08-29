import { FiUser } from "react-icons/fi";

import { Dashboard, Plan } from "~/assets/img/side-panel/side-panel.img.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { FeedbackManager } from "../feedback-manager/feedback-manager.js";
import { NavigationItem } from "../navigation-item/navigation-item.js";
import styles from "./styles.module.css";

const SidePanel: React.FC = () => {
	const asideClasses = getClassNames(styles["aside"], "show-desktop-up");
	const user = useAppSelector((state) => state.auth.user);

	return (
		<aside className={asideClasses}>
			<div className={getClassNames("cluster", styles["side-panel-container"])}>
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
				<FeedbackManager type="side-panel" />
			</div>
		</aside>
	);
};

export { SidePanel };
