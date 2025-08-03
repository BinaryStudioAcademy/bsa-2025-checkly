import React from "react";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

import { Link } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	isOpen: boolean;
};

const UserMenu: React.FC<Properties> = ({ isOpen }) => {
	const menuDropdownClass = getClassNames(
		styles["menu-dropdown"],
		isOpen && styles["menu-dropdown--open"],
	);
	const dashboardClass = getClassNames(
		styles["menu-item"],
		styles["menu-item--dashboard"],
	);
	const logoutClass = getClassNames(
		styles["menu-item"],
		styles["menu-item--logout"],
	);
	const menuIconClass = styles["menu-icon"];

	return (
		<nav aria-label="User menu" className={menuDropdownClass}>
			<ul>
				<li>
					<Link to="/">
						<button
							aria-label="Dashboard"
							className={dashboardClass}
							role="menuitem"
							tabIndex={0}
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
							role="menuitem"
							tabIndex={0}
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
