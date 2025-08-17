import React from "react";

import themeStyles from "~/assets/mock-data/themes.mock.module.css";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { parseDayTopic } from "~/libs/helpers/helpers.js";
import { type PlanDaily } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	containerId?: string;
	days: PlanDaily[];
	isForPrint?: boolean;
	notes?: string;
	theme?: "colourful" | "minimal" | "motivating" | "with remarks";
	title?: string;
};

const PlanPreview: React.FC<Properties> = ({
	containerId = "plan-preview",
	days,
	notes,
	theme = "colourful",
	title = "My Personal Plan",
}) => {
	const themeClass = themeStyles[theme] ?? themeStyles["colourful"];

	return (
		<div
			className={getClassNames(styles["plan-container"], themeClass)}
			id={containerId}
		>
					<h1 className={styles["plan-title"]}>{title}</h1>

					<div className={styles["days-grid-container"]}>
						{days.map((day) => {
							const { main, weekday } = parseDayTopic(day.topic);

							return (
								<div className={styles["day-block"]} key={day.id}>
									<h2 className={styles["day-topic"]}>
										{main}{" "}
										<span className={styles["day-weekday"]}>{weekday}</span>
									</h2>
									<ul className={styles["activities-list"]}>
										{day.activities.map((act) => (
											<li className={styles["activity-item"]} key={act.id}>
												{act.text}
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
};

export { PlanPreview };
