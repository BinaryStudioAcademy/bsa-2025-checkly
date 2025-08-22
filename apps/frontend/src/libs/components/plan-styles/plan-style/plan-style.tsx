import { PlanStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { type PlanStyleOption, type ViewOptions } from "~/libs/types/types.js";

import { Day, Notes, PlanHeader } from "../components/components.js";
import { PLAN } from "../mocks/plan-mocks.js";
import styles from "./styles.module.css";

type Properties = {
	inputStyle: PlanStyleOption;
	planTitle?: string;
	view?: ViewOptions;
};

const PlanStyle: React.FC<Properties> = ({
	inputStyle,
	planTitle = "Plan title",
	view = "regular",
}: Properties) => {
	const containerClasses = getClassNames(
		styles["container"],
		styles[`${view}-view`],
		view === "homepage" && styles[`${view}-container`],
		view === "selection" && styles[`${view}-container`],
		view === "desktop" && styles[`${view}-container`],
		view === "mobile" && styles[`${view}-container`],
		PlanStyleModules[inputStyle]["container"],
	);

	const planBodyClasses = getClassNames(
		styles["plan-body"],
		PlanStyleModules[inputStyle]["plan-body"],
	);

	const dayListClasses = getClassNames(
		styles["day-list"],
		PlanStyleModules[inputStyle]["day-list"],
	);

	return (
		<section className={containerClasses}>
			<PlanHeader inputStyle={inputStyle} title={planTitle} />
			<div className={planBodyClasses}>
				<ul className={dayListClasses}>
					{PLAN.days.map((day) => {
						return (
							<Day
								dayNumber={day.dayNumber}
								firstDayDate={PLAN.createdAt as string}
								inputStyle={inputStyle}
								key={day.id}
								tasks={day.tasks}
							/>
						);
					})}
					<Notes inputStyle={inputStyle} />
				</ul>
			</div>
		</section>
	);
};

export { PlanStyle };
