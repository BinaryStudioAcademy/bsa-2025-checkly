import React from "react";

import themeStyles from "~/assets/mock-data/themes.mock.module.css";
import { ONE, TWO } from "~/libs/constants/numbers.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useA4Scale } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type DayTopic = {
	main: string;
	weekday: string;
}

const parseDayTopic = (topic: string): DayTopic => {
	const TOPIC_WITH_WEEKDAY_REGEX = /^(.+?) \((.+?)\)$/;
	const match = TOPIC_WITH_WEEKDAY_REGEX.exec(topic);

	if (match && match[ONE] && match[TWO]) {
		return {
			main: match[ONE],
			weekday: `(${match[TWO]})`,
		};
	}

	return { main: topic, weekday: "" };
};

type Activity = { id: string; text: string };

type Day = {
	activities: Activity[];
	id: string;
	topic: string;
};

type Properties = {
	containerId?: string;
	days: Day[];
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
	const themeClass = themeStyles[theme] || themeStyles["colourful"];

	const { scale, viewportReference } = useA4Scale();

	return (
		<div
			className={getClassNames(styles["plan-container"], themeClass)}
			id={containerId}
		>
			<div className={styles["a4-viewport"]} ref={viewportReference}>
				<div
					className={styles["plan-preview"]}
					style={{ transform: `scale(${String(scale)})` }}
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
			</div>
		</div>
	);
};

export { PlanPreview };
