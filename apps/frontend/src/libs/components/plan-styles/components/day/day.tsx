import { planStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { type PlanStyleOption, type Task } from "~/libs/types/types.js";

import { Task as TaskItem } from "../task/task.js";
import styles from "./styles.module.css";

type Properties = {
	dayNumber: number;
	inputStyle: PlanStyleOption;
	tasks: Task[];
	weekday?: string;
};

const Day: React.FC<Properties> = ({
	dayNumber,
	inputStyle,
	tasks,
	weekday,
}: Properties) => {
	const dayItemClasses = getClassNames(
		styles["day-item"],
		planStyleModules[inputStyle][`day-item--${inputStyle}`],
	);

	const dayTitleClasses = getClassNames(
		styles["day-title"],
		planStyleModules[inputStyle][`day-title--${inputStyle}`],
	);

	const taskListClasses = getClassNames(
		styles["task-list"],
		planStyleModules[inputStyle][`task-list--${inputStyle}`],
	);

	return (
		<li className={dayItemClasses} key={dayNumber}>
			<h2 className={dayTitleClasses}>
				{`Day ${dayNumber.toString()}`}&nbsp;
				{weekday && <span className={styles["day-of-week"]}>({weekday})</span>}
			</h2>
			<ul className={taskListClasses}>
				{tasks.map((task: Task) => {
					return (
						<TaskItem
							id={task.id + dayNumber.toString()}
							inputStyle={inputStyle}
							key={task.id + dayNumber.toString()}
							taskText={task.description}
						/>
					);
				})}
			</ul>
		</li>
	);
};

export { Day };
