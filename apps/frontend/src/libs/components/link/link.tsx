import { NavLink } from "react-router-dom";

import buttonStyles from "~/libs/components/button/styles.module.css";
import { type AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { type ValueOf } from "~/libs/types/types.js";

type Properties = {
	asButton?: boolean;
	children: React.ReactNode;
	to: ValueOf<typeof AppRoute>;
};

const Link: React.FC<Properties> = ({
	asButton = false,
	children,
	to,
}: Properties) => {
	const linkClasses = asButton
		? getClassNames(
				buttonStyles["button"],
				buttonStyles["button-secondary"],
				buttonStyles["button-small"],
				buttonStyles["button-cluster"],
				"cluster",
			)
		: "";

	return (
		<NavLink className={linkClasses} to={to}>
			{asButton ? children : <span>{children}</span>}
		</NavLink>
	);
};

export { Link };
