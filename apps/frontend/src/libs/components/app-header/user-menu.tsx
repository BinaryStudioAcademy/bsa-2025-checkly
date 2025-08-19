import React, { useCallback } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/helpers.js";

import { NavigationItem } from "../navigation-item/navigation-item.js";
import styles from "./styles.module.css";

type Properties = {
	isOpen: boolean;
};

const UserMenu: React.FC<Properties> = ({ isOpen }) => {
	const menuDropdownClass = getClassNames(
		styles["menu-dropdown"],
		isOpen && styles["menu-dropdown--open"],
	);
	const navigate = useNavigate();

	const handleLogout = useCallback((): void => {
		void navigate(AppRoute.LOGOUT);
	}, [navigate]);

	return (
		<nav aria-label="User menu" className={menuDropdownClass}>
			<ul className={styles["menu-dropdown__list"]}>
				<NavigationItem
					buttonText="Log out"
					buttonType="logout"
					icon={<FiLogOut />}
					navigateTo={AppRoute.LOGOUT}
					onClick={handleLogout}
				/>
			</ul>
		</nav>
	);
};

export { UserMenu };
