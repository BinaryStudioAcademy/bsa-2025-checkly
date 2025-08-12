import { planStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { type PlanStyleOption, type ViewOptions } from "~/libs/types/types.js";

import { Day, Notes, PlanHeader } from "../components/components.js";
import { plan } from "../mocks/plan-mocks.js";
import styles from "./styles.module.css";

type Properties = {
	inputStyle: PlanStyleOption;
	view?: ViewOptions;
};

const PlanStyle: React.FC<Properties> = ({
	inputStyle,
	view = "regular",
}: Properties) => {
	const withRemarks = inputStyle === "withremarks";

	const containerClasses = getClassNames(
		styles["container"],
		styles[`${view}-view`],
		view === "homepage" && styles[`${view}-container`],
		view === "selection" && styles[`${view}-container`],
		planStyleModules[inputStyle][`container--${inputStyle}`],
	);

	const planBodyClasses = getClassNames(
		styles["plan-body"],
		planStyleModules[inputStyle][`plan-body--${inputStyle}`],
	);

	const dayListClasses = getClassNames(
		styles["day-list"],
		planStyleModules[inputStyle][`day-list--${inputStyle}`],
	);

	return (
		<section className={containerClasses}>
			<PlanHeader inputStyle={inputStyle} title={plan.title} />
			<div className={planBodyClasses}>
				<ul className={dayListClasses}>
					{plan.days.map((day) => {
						return (
							<Day
								dayNumber={day.dayNumber}
								inputStyle={inputStyle}
								key={day.id}
								tasks={day.tasks}
							/>
						);
					})}
					{withRemarks && <Notes />}
				</ul>
			</div>
		</section>
	);
};

export { PlanStyle };
