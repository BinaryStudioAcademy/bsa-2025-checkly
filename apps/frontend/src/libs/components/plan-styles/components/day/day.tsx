import { PlanStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames, getWeekday } from "~/libs/helpers/helpers.js";
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
		PlanStyleModules[inputStyle]["day-item"],
	);

	const dayTitleClasses = getClassNames(
		styles["day-title"],
		PlanStyleModules[inputStyle]["day-title"],
	);

	const taskListClasses = getClassNames(
		styles["task-list"],
		PlanStyleModules[inputStyle]["task-list"],
	);

	const weekday = getWeekday(firstDayDate as string, dayNumber);

	return (
		<li className={dayItemClasses} key={dayNumber}>
			<h2 className={dayTitleClasses}>
				{`Day ${dayNumber.toString()}`}&nbsp;
				<span className={PlanStyleModules[inputStyle]["day-of-week"]}>
					({weekday})
				</span>
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
