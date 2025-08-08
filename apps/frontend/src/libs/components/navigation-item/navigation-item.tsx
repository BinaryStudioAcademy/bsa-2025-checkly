import { type ReactNode, useRef } from "react";
import { useLocation } from "react-router-dom";

import { type AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";

import { Link } from "../components.js";
import styles from "./styles.module.css";

type ButtonType = "logout" | "side-panel" | "user-menu";

type Properties = {
	buttonText: string;
	buttonType: ButtonType;
	className?: string | undefined;
	icon: ReactNode;
	navigateTo: ValueOf<typeof AppRoute>;
};

const NavigationItem: React.FC<Properties> = ({
	buttonText,
	buttonType,
	className,
	icon,
	navigateTo,
}: Properties) => {
	const itemClass = getClassNames(
		styles["menu-item"],
		styles[`menu-item--${buttonType}`],
	);

	const { pathname } = useLocation();

	const navReference = useRef<HTMLLIElement>(null);

	const isActive = pathname === navigateTo && buttonType === "side-panel";

	const liClassNames = getClassNames(className, isActive && styles["active"]);

	return (
		<li className={liClassNames} ref={navReference}>
			<Link to={navigateTo}>
				<button
					aria-label={buttonText}
					className={itemClass}
					role="menuitem"
					tabIndex={0}
					type="button"
				>
					{icon}
					{buttonText}
				</button>
			</Link>
		</li>
	);
};

export { NavigationItem };
