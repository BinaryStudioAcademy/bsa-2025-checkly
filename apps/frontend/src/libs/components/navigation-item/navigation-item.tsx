import { type ReactNode } from "react";

import { type AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";

import { Link } from "../components.js";
import styles from "./styles.module.css";

type ButtonType = "logout" | "side-panel" | "user-menu";

type Properties = {
	buttonText: string;
	buttonType: ButtonType;
	className?: string;
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

	return (
		<li className={className}>
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
