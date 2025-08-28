import { PlanStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames, getWeekday } from "~/libs/helpers/helpers.js";
import { type PlanStyleOption } from "~/libs/types/types.js";
import { type TaskDto } from "~/modules/tasks/libs/types/types.js";

import { Task as TaskItem } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	dayNumber: number;
	firstDayDate?: string;
	inputStyle: PlanStyleOption;
	tasks: TaskDto[];
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

	const weekday = firstDayDate ? getWeekday(firstDayDate, dayNumber) : "";

	return (
		<li
			className={getClassNames(dayItemClasses, styles["day-list__item"])}
			key={dayNumber}
		>
			<h2 className={dayTitleClasses}>
				{`Day ${dayNumber.toString()}`}
				{weekday && (
					<>
						&nbsp;
						<span className={PlanStyleModules[inputStyle]["day-of-week"]}>
							({weekday})
						</span>
					</>
				)}
			</h2>
			<ol
				className={getClassNames(
					taskListClasses,
					styles["day-list__task-list"],
				)}
			>
				{tasks.map((task: TaskDto) => {
					return (
						<TaskItem
							executionTimeType={task.executionTimeType ?? undefined}
							id={task.id}
							inputStyle={inputStyle}
							key={task.id.toString() + dayNumber.toString()}
							taskText={task.title}
						/>
					);
				})}
			</ol>
		</li>
	);
};

export { Day };
