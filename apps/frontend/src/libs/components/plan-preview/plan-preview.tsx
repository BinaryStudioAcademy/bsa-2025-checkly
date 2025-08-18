import React from "react";

import themeStyles from "~/assets/mock-data/themes.mock.module.css";
import { ONE } from "~/libs/constants/constants.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useA4Scale } from "~/libs/hooks/use-a4-scale/use-a4-scale.hook.js";
import { type PlanDay } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	containerId?: string;
	days: PlanDay[];
	isForPrint?: boolean;
	notes?: string;
	theme?: "colourful" | "minimal" | "motivating" | "with remarks";
	title?: string;
};

const SEVEN = 7;

const getWeekday = (dayNumber: number): string => {
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  return weekdays[(dayNumber - ONE) % SEVEN] ?? "";
};

const PlanPreview: React.FC<Properties> = ({
	containerId = "plan-preview",
	days,
	isForPrint = false,
	notes,
	theme = "colourful",
	title = "My Personal Plan",
}) => {
	const themeClass = themeStyles[theme] ?? themeStyles["colourful"];
	const { scale, viewportReference } = useA4Scale();

	const content = (
		<div className={styles["plan-preview"]}>
			<h1 className={styles["plan-title"]}>{title}</h1>

			<div className={styles["days-grid-container"]}>
				{days.map((day) => {
					const weekday = getWeekday(day.dayNumber);

					return (
						<div className={styles["day-block"]} key={day.id}>
							<h2 className={styles["day-topic"]}>
								Day {day.dayNumber} <span className={styles["day-weekday"]}>({weekday})</span>
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
