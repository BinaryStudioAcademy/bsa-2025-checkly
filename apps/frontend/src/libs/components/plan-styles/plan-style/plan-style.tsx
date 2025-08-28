import { PlanStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import {
	type PlanDaysTaskDto,
	type PlanStyleOption,
	type ViewOptions,
} from "~/libs/types/types.js";

import { Day, Notes, PlanHeader } from "../components/components.js";
import styles from "./styles.module.css";

const DATE_PART_INDEX = 0;

type Properties = {
	inputStyle: PlanStyleOption;
	planData?: null | PlanDaysTaskDto;
	view?: ViewOptions;
};

const PlanStyle: React.FC<Properties> = ({
	inputStyle,
	planData,
	view = "regular",
}: Properties) => {
	if (!planData?.days) {
		return null;
	}

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

	return (
		<section className={containerClasses}>
			<PlanHeader inputStyle={inputStyle} title={planData.title} />
			<div className={planBodyClasses}>
				<ul className={dayListClasses}>
					{planData.days.map((day) => (
						<Day
							dayNumber={day.dayNumber}
							firstDayDate={
								new Date().toISOString().split("T")[DATE_PART_INDEX]
							}
							inputStyle={inputStyle}
							key={day.id}
							tasks={day.tasks}
						/>
					))}
					<Notes inputStyle={inputStyle} />
				</ul>
			</div>
		</section>
	);
};

export { PlanStyle };
