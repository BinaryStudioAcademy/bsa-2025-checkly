import { type Task } from "~/libs/types/types.js";

import { Task as TaskItem } from "../task/task.js";
import styles from "./styles.module.css";

type Properties = {
	dayNumber: number;
	tasks: Task[];
	weekday?: string;
};

const Day: React.FC<Properties> = ({
	dayNumber,
	tasks,
	weekday,
}: Properties) => {
	return (
		<li className={styles["day-item"]} key={dayNumber}>
			<h2 className={styles["day-title"]}>
				{`Day ${dayNumber.toString()}`}&nbsp;
				{weekday && <span className={styles["day-of-week"]}>({weekday})</span>}
			</h2>
			<ul className={styles["task-list"]}>
				{tasks.map((task: Task) => {
					return (
						<TaskItem
							id={task.id + dayNumber.toString()}
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
