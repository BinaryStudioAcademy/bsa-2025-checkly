import { PlanStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useStyleKey } from "~/libs/hooks/hooks.js";
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
	const { getStyleKey } = useStyleKey();
	const styleKey = getStyleKey(inputStyle);
	const taskClasses = getClassNames(
		styles["task"],
		PlanStyleModules[styleKey]["task"],
	);

	const taskCheckboxClasses = getClassNames(
		styles["task-checkbox"],
		PlanStyleModules[styleKey]["task-checkbox"],
	);

	const taskTextClasses = getClassNames(
		styles["task-text"],
		PlanStyleModules[styleKey]["task-text"],
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
