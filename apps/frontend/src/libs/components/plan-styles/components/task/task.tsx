import { PlanStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { type PlanStyleOption } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	id: number;
	inputStyle: PlanStyleOption;
	taskText: string;
};

const Task: React.FC<Properties> = ({
	id,
	inputStyle,
	taskText,
}: Properties) => {
	const taskId = id.toString();

	const taskClasses = getClassNames(
		styles["task"],
		PlanStyleModules[inputStyle]["task"],
	);

	const taskCheckboxClasses = getClassNames(
		styles["task-checkbox"],
		PlanStyleModules[inputStyle]["task-checkbox"],
	);

	const taskTextClasses = getClassNames(
		styles["task-text"],
		PlanStyleModules[inputStyle]["task-text"],
	);

	return (
		<li className={taskClasses} key={id}>
			<input
				className={taskCheckboxClasses}
				disabled
				id={taskId}
				name={`Task${taskId}`}
				type="checkbox"
			/>
			<label className={taskTextClasses} htmlFor={taskId}>
				{taskText}
			</label>
		</li>
	);
};

export { Task };
