import { NavLink } from "react-router-dom";

import buttonStyles from "~/libs/components/button/styles.module.css";
import { type AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import {
	type ButtonSize,
	type ButtonVariant,
	type ValueOf,
} from "~/libs/types/types.js";

type Properties = {
	asButtonSize?: ButtonSize;
	asButtonVariant?: ButtonVariant;
	children: React.ReactNode;
	className?: string;
	to: ValueOf<typeof AppRoute>;
};

const Link: React.FC<Properties> = ({
	asButtonSize = "small",
	asButtonVariant,
	children,
	className,
	to,
}: Properties) => {
	const linkClasses = getClassNames(
		asButtonVariant
			? getClassNames(
					buttonStyles["button"],
					buttonStyles[`button-${asButtonVariant}`],
					buttonStyles[`button-${asButtonSize}`],
					buttonStyles["button-cluster"],
					"cluster",
				)
			: "",
		className,
	);

	return (
		<NavLink className={linkClasses} to={to}>
			{asButtonVariant ? children : <span>{children}</span>}
		</NavLink>
	);
};

export { Link };
