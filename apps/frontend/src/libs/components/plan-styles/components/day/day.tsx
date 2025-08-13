import { planStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { getWeekday } from "~/libs/helpers/get-weekday.js";
import { type PlanStyleOption, type Task } from "~/libs/types/types.js";

import { Task as TaskItem } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	dayNumber: number;
	firstDayDate?: string;
	inputStyle: PlanStyleOption;
	tasks: Task[];
};

const Day: React.FC<Properties> = ({
	dayNumber,
	firstDayDate,
	inputStyle,
	tasks,
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

	const weekday = getWeekday(firstDayDate as string, dayNumber);

	return (
		<li className={dayItemClasses} key={dayNumber}>
			<h2 className={dayTitleClasses}>
				{`Day ${dayNumber.toString()}`}&nbsp;
				{inputStyle === "withremarks" && (
					<span
						className={
							planStyleModules[inputStyle][`day-of-week--${inputStyle}`]
						}
					>
						({weekday})
					</span>
				)}
			</h2>
			<ol className={taskListClasses}>
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
			</ol>
		</li>
	);
};

export { Day };
