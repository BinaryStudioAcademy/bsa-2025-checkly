import React, { useCallback } from "react";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Plan } from "~/assets/img/side-panel/side-panel.img.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useAppDispatch } from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/slices/auth.js";

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
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = useCallback((): void => {
		void dispatch(authActions.logout({ navigate }));
	}, [dispatch, navigate]);

	return (
		<nav aria-label="User menu" className={menuDropdownClass}>
			<ul>
				<NavigationItem
					buttonText="Profile"
					buttonType="user-menu"
					icon={<CgProfile />}
					navigateTo={AppRoute.PROFILE}
				/>
				<NavigationItem
					buttonText="Dashboard"
					buttonType="user-menu"
					icon={<MdDashboard />}
					navigateTo={AppRoute.DASHBOARD}
				/>
				<NavigationItem
					buttonText="My plan"
					buttonType="user-menu"
					className="hide-desktop-up"
					icon={<Plan />}
					navigateTo={AppRoute.PLAN}
				/>
				<NavigationItem
					buttonText="Log out"
					buttonType="logout"
					icon={<FiLogOut />}
					navigateTo={AppRoute.SIGN_IN}
					onClick={handleLogout}
				/>
			</ul>
		</nav>
	);
};

export { UserMenu };
