import React, { useCallback } from "react";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Plan } from "~/assets/img/side-panel/side-panel.img.js";
import { MESSAGES } from "~/libs/constants/messages.constants.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useAppDispatch } from "~/libs/hooks/hooks.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";
import { actions as authActions } from "~/modules/auth/slices/auth.js";

import { NavigationItem } from "../navigation-item/navigation-item.js";
import styles from "./styles.module.css";

type Properties = {
	isOpen: boolean;
};

const UserMenu: React.FC<Properties> = function UserMenu({ isOpen }) {
	const menuDropdownClass = getClassNames(
		styles["menu-dropdown"],
		isOpen && styles["menu-dropdown--open"],
	);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = useCallback((): void => {
		const dispatchResult = dispatch(authActions.logout());

		if (dispatchResult instanceof Promise) {
			dispatchResult.catch(() => {
				notifications.error(MESSAGES.AUTH.LOGOUT_FAILED);
			});
		}

		const navigateResult = navigate(AppRoute.SIGN_IN);

		if (navigateResult instanceof Promise) {
			navigateResult.catch(() => {
				notifications.error(MESSAGES.NAVIGATION.FAILED);
			});
		}
	}, [dispatch, navigate]);

	return (
		<nav aria-label="User menu" className={menuDropdownClass}>
			<ul>
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
