import { PlanStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { type PlanStyleOption, type ViewOptions } from "~/libs/types/types.js";
import { type PlanWithCategoryDto } from "~/modules/plans/libs/types/types.js";

import { Day, Notes, PlanHeader } from "../components/components.js";
import { PLAN_TEMPLATE } from "../mocks/plan-mocks.js";
import styles from "./styles.module.css";

const PLAN_START_DATE = "2025-08-30";

type Properties = {
	inputStyle: PlanStyleOption;
	notes?: string;
	plan?: PlanWithCategoryDto;
	view?: ViewOptions;
};

const PlanStyle: React.FC<Properties> = ({
	inputStyle,
	notes,
	plan = PLAN_TEMPLATE,
	view = "regular",
}: Properties) => {
	const containerClasses = getClassNames(
		styles["container"],
		styles[`${view}-view`],
		view === "homepage" && styles[`${view}-container`],
		view === "selection" && styles[`${view}-container`],
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

	const headerTitle = planTitle?.trim() || PLAN.title;

	return (
		<section className={containerClasses}>
			<PlanHeader inputStyle={inputStyle} title={plan.title} />
			<div className={planBodyClasses}>
				<ul className={dayListClasses}>
					{plan.days.map((day) => {
						return (
							<Day
								dayNumber={day.dayNumber}
								firstDayDate={PLAN_START_DATE}
								inputStyle={inputStyle}
								key={day.id}
								tasks={day.tasks}
							/>
						);
					})}
					<Notes inputStyle={inputStyle} notes={notes} />
				</ul>
			</div>
		</section>
	);
};

export { PlanStyle };
