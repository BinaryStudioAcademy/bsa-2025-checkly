import React, { type JSX } from "react";
import { IoMoonOutline as EveningIcon } from "react-icons/io5";
import { LuSun as AfternoonIcon } from "react-icons/lu";
import { TbSunset2 as MorningIcon } from "react-icons/tb";

import { PlanStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { type PlanStyleOption, type ValueOf } from "~/libs/types/types.js";

import { ExecutionTimeType } from "../../libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	executionTimeType?: ValueOf<typeof ExecutionTimeType>;
	id: number;
	inputStyle: PlanStyleOption;
	taskText: string;
};

const Task: React.FC<Properties> = ({
	executionTimeType,
	id,
	inputStyle,
	taskText,
}: Properties) => {
	const icons: Record<string, JSX.Element> = {
		[ExecutionTimeType.AFTERNOON]: <AfternoonIcon className={styles["icon"]} />,
		[ExecutionTimeType.EVENING]: <EveningIcon className={styles["icon"]} />,
		[ExecutionTimeType.MORNING]: <MorningIcon className={styles["icon"]} />,
	};

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
			{executionTimeType ? icons[executionTimeType] : null}
		</li>
	);
};

export { Task };
