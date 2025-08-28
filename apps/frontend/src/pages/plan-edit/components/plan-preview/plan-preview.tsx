import React from "react";

import {
	Day,
	Notes,
	PlanHeader,
} from "~/libs/components/plan-styles/components/components.js";
import { PlanStyleModules, ZERO } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useA4Scale } from "~/libs/hooks/hooks.js";
import {
	type ExecutionTimeTypeValue,
	type PlanDay,
	type PlanStyleOption,
} from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	containerId?: string;
	days: PlanDay[];
	firstDayDate: string;
	isForPrint?: boolean;
	notes?: string;
	theme?: PlanStyleOption;
	title?: string;
};

const PlanPreview: React.FC<Properties> = ({
	containerId = "plan-preview",
	days,
	firstDayDate,
	isForPrint = false,
	notes,
	theme = "COLOURFUL",
	title = "My Personal Plan",
}) => {
	const themeClasses =
		PlanStyleModules[theme.toUpperCase() as keyof typeof PlanStyleModules];

	const { scale, viewportReference } = useA4Scale();

	const content = (
		<>
			<PlanHeader inputStyle={theme} title={title} />

			<div className={themeClasses["plan-body"]}>
				<ul className={themeClasses["day-list"]}>
					{days.map((day) => (
						<Day
							dayNumber={day.dayNumber}
							firstDayDate={firstDayDate}
							inputStyle={theme}
							key={day.id}
							tasks={day.tasks.map((task) => ({
								completedAt: null,
								description: task.description,
								executionTimeType: task.executionType as ExecutionTimeTypeValue,
								id: Number(task.id),
								isCompleted: task.isCompleted,
								order: task.order ?? ZERO,
								planDayId: day.dayNumber,
								title: task.title ?? task.description,
							}))}
						/>
					))}
					{notes && <Notes inputStyle={theme} notes={notes} />}
				</ul>
			</div>
		</>
	);

	return isForPrint ? (
		<div
			className={getClassNames(
				styles["plan-container"],
				themeClasses["container"],
			)}
			id={containerId}
		>
			{content}
		</div>
	) : (
		<div className={styles["a4-viewport"]} ref={viewportReference}>
			<div
				className={getClassNames(
					styles["plan-preview"],
					themeClasses["container"],
				)}
				id={containerId}
				style={{ transform: `scale(${scale.toString()})` }}
			>
				{content}
			</div>
		</div>
	);
};

export { PlanPreview };
