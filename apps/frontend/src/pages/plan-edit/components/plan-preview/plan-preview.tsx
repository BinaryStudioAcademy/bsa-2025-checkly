import React from "react";

import { planStyleModules } from "~/libs/enums/enums.js";
import { getClassNames, getWeekday } from "~/libs/helpers/helpers.js";
import { useA4Scale } from "~/libs/hooks/hooks.js";
import { type PlanDay, type PlanStyleOption } from "~/libs/types/types.js";

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
	theme = "colourful",
	title = "My Personal Plan",
}) => {
	const themeClass = planStyleModules[theme]["plan"];
	
	const { scale, viewportReference } = useA4Scale();

	const content = (
		<div className={styles["plan-preview"]}>
			<h1 className={styles["plan-title"]}>{title}</h1>

			<div className={styles["days-grid-container"]}>
				{days.map((day) => {
					const weekday = getWeekday(firstDayDate, day.dayNumber);

					return (
						<div className={styles["day-block"]} key={day.id}>
							<h2 className={styles["day-topic"]}>
								Day {day.dayNumber}{" "}
								<span className={styles["day-weekday"]}>({weekday})</span>
							</h2>
							<ul className={styles["activities-list"]}>
								{day.tasks.map((task) => (
									<li className={styles["activity-item"]} key={task.id}>
										<span>{task.description}</span>
									</li>
								))}
							</ul>
						</div>
					);
				})}

				{notes && (
					<div className={styles["notes-section"]}>
						<h3>Notes</h3>
						<div className={styles["notes-lines"]}>
							<p>{notes}</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);

	return isForPrint ? (
		<div
			className={getClassNames(styles["plan-container"], themeClass)}
			id={containerId}
		>
			{content}
		</div>
	) : (
		<div
			className={getClassNames(styles["a4-viewport"], themeClass)}
			ref={viewportReference}
		>
			<div
				className={getClassNames(styles["plan-preview"], themeClass)}
				id={containerId}
				style={{ transform: `scale(${scale.toString()})` }}
			>
				{content}
			</div>
		</div>
	);
};

export { PlanPreview };
