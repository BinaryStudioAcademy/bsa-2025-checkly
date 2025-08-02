import { NavLink } from "react-router-dom";

import buttonStyles from "~/libs/components/button/styles.module.css";
import { type AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { type ButtonVariant, type ValueOf } from "~/libs/types/types.js";

type Properties = {
	asButtonVariant?: ButtonVariant;
	children: React.ReactNode;
	to: ValueOf<typeof AppRoute>;
};

const Link: React.FC<Properties> = ({
	asButtonVariant,
	children,
	to,
}: Properties) => {
	const linkClasses = asButtonVariant
		? getClassNames(
				buttonStyles["button"],
				buttonStyles[`button-${asButtonVariant}`],
				buttonStyles["button-small"],
				buttonStyles["button-cluster"],
				"cluster",
			)
		: "";

	return (
		<NavLink className={linkClasses} to={to}>
			{asButtonVariant ? children : <span>{children}</span>}
		</NavLink>
	);
};

export { Link };
