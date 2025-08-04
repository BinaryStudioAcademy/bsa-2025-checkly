import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { Dashboard, Plan } from "~/assets/img/side-panel/side-panel.img.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import { NavigationItem } from "../navigation-item/navigation-item.js";
import styles from "./styles.module.css";

const INDEXES = {
	first: 0,
	second: 1,
} as const;

const SidePanel: React.FC = () => {
	const asideClasses = getClassNames(styles["aside"], "show-desktop-up");

	const { pathname } = useLocation();

	const navReference = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const getActiveItem = (path: string): HTMLUListElement => {
			let element: HTMLUListElement | null = null;

			switch (path) {
				case AppRoute.DASHBOARD: {
					element = navReference.current?.children[INDEXES.first]?.children[
						INDEXES.first
					] as HTMLUListElement;
					break;
				}

				case AppRoute.PLAN: {
					element = navReference.current?.children[INDEXES.second]?.children[
						INDEXES.first
					] as HTMLUListElement;
					break;
				}
			}

			return element as HTMLUListElement;
		};

		const element = getActiveItem(pathname);

		element.classList.add(styles["active"] as string);
	}, [pathname]);

	return (
		<>
			<aside className={asideClasses}>
				<nav className={styles["navigation"]}>
					<ul className={styles["navigation__menu"]} ref={navReference}>
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
					</ul>
				</nav>
			</aside>
		</>
	);
};

export { SidePanel };
