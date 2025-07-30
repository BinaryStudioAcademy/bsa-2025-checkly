import React from "react";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

import { Link } from "~/libs/components/components.js";

import styles from "./styles.module.css";

interface UserMenuProperties {
	isOpen: boolean;
}

const UserMenu: React.FC<UserMenuProperties> = ({ isOpen }) => {
	const menuDropdownClass = isOpen
		? `${String(styles["menu-dropdown"])} ${String(styles["menu-dropdown--open"])}`
		: String(styles["menu-dropdown"]);
	const dashboardClass = `${String(styles["menu-item"])} ${String(styles["menu-item--dashboard"])}`;
	const logoutClass = `${String(styles["menu-item"])} ${String(styles["menu-item--logout"])}`;
	const menuIconClass = String(styles["menu-icon"]);

	return (
		<nav aria-label="User menu" className={menuDropdownClass}>
			<ul>
				<li>
					<Link to="/">
						<button
							aria-label="Dashboard"
							className={dashboardClass}
							tabIndex={-1}
							type="button"
						>
							<MdDashboard className={menuIconClass} />
							Dashboard
						</button>
					</Link>
				</li>
				<li>
					<Link to="/">
						<button
							aria-label="Log out"
							className={logoutClass}
							tabIndex={-1}
							type="button"
						>
							<FiLogOut className={menuIconClass} />
							Log out
						</button>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export { UserMenu };
