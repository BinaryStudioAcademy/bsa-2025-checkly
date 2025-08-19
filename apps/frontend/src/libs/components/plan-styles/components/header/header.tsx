import { PlanStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useStyleKey } from "~/libs/hooks/hooks.js";
import { type PlanStyleOption } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	inputStyle: PlanStyleOption;
	title: string;
};

const PlanHeader: React.FC<Properties> = ({
	inputStyle,
	title,
}: Properties) => {
	const { getStyleKey } = useStyleKey();
	const styleKey = getStyleKey(inputStyle);
	const headerClasses = getClassNames(
		styles["plan-header"],
		PlanStyleModules[styleKey]["plan-header"],
	);

	const planTitleClasses = getClassNames(
		styles["plan-title"],
		PlanStyleModules[styleKey]["plan-title"],
	);

	return (
		<header className={headerClasses}>
			<h1 className={planTitleClasses}>{title}</h1>
		</header>
	);
};

export { PlanHeader };
