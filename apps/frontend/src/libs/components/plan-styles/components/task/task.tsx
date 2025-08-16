import { planStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { type PlanStyleOption } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	id: string;
	inputStyle: PlanStyleOption;
	taskText: string;
};

const Task: React.FC<Properties> = ({
	id,
	inputStyle,
	taskText,
}: Properties) => {
	const taskClasses = getClassNames(
		styles["task"],
		planStyleModules[inputStyle]["task"],
	);

	const taskCheckboxClasses = getClassNames(
		styles["task-checkbox"],
		planStyleModules[inputStyle]["task-checkbox"],
	);

	const taskTextClasses = getClassNames(
		styles["task-text"],
		planStyleModules[inputStyle]["task-text"],
	);

	return (
		<li className={taskClasses} key={id}>
			<input
				className={taskCheckboxClasses}
				disabled
				id={id}
				name={`Task${id}`}
				type="checkbox"
			/>
			<label className={taskTextClasses} htmlFor={id}>
				{taskText}
			</label>
		</li>
	);
};

export { Task };
