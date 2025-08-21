import { PlanStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
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
	const headerClasses = getClassNames(
		styles["plan-header"],
		PlanStyleModules[inputStyle]["plan-header"],
	);

	const planTitleClasses = getClassNames(
		styles["plan-title"],
		PlanStyleModules[inputStyle]["plan-title"],
	);

	return (
		<header className={headerClasses}>
			<h1 className={planTitleClasses}>{title}</h1>
		</header>
	);
};

export { PlanHeader };
