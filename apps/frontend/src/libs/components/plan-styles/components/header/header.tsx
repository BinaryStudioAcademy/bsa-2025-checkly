import { planStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
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
		styles["header"],
		planStyleModules[inputStyle][`header--${inputStyle}`],
	);

	const planTitleClasses = getClassNames(
		styles["plan-title"],
		planStyleModules[inputStyle][`plan-title--${inputStyle}`],
	);

	return (
		<header className={headerClasses}>
			<h1 className={planTitleClasses}>{title}</h1>
		</header>
	);
};

export { PlanHeader };
