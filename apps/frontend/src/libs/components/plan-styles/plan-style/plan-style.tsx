import { PlanStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useStyleKey } from "~/libs/hooks/hooks.js";
import { type PlanStyleOption, type ViewOptions } from "~/libs/types/types.js";

import { Day, Notes, PlanHeader } from "../components/components.js";
import { PLAN } from "../mocks/plan-mocks.js";
import styles from "./styles.module.css";

type Properties = {
	inputStyle: PlanStyleOption;
	view?: ViewOptions;
};

const PlanStyle: React.FC<Properties> = ({
	inputStyle,
	view = "regular",
}: Properties) => {
	const { getStyleKey } = useStyleKey();
	const styleKey = getStyleKey(inputStyle);
	const containerClasses = getClassNames(
		styles["container"],
		styles[`${view}-view`],
		view === "homepage" && styles[`${view}-container`],
		view === "selection" && styles[`${view}-container`],
		PlanStyleModules[styleKey]["container"],
	);

	const planBodyClasses = getClassNames(
		styles["plan-body"],
		PlanStyleModules[styleKey]["plan-body"],
	);

	const dayListClasses = getClassNames(
		styles["day-list"],
		PlanStyleModules[styleKey]["day-list"],
	);

	return (
		<section className={containerClasses}>
			<PlanHeader inputStyle={inputStyle} title={PLAN.title} />
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
