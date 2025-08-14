import React from "react";

import { activitiesMockData } from "~/assets/mock-data/activities-data.mock.js";
import {
	ACTIVITY_BULLET,
	type CategoryId,
	DAY_NAMES,
	DEFAULT_CONTAINER_ID,
	DEFAULT_PLAN_TITLE,
	DEFAULT_THEME,
	ONE,
	PLAN_NOTES_LINES,
	TWO,
	ZERO,
} from "~/libs/constants/constants.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import {
	type ActivitiesMockData,
	type Activity,
	type Day,
} from "~/libs/types/types.js";

import styles from "./styles.module.css";

const getDayName = (index: number): string => DAY_NAMES[index] || "";

type Properties = {
	categoryId: CategoryId;
	containerId?: string;
	planTitle?: string;
	theme?: string;
};

const PlanDisplay: React.FC<Properties> = ({
	containerId = DEFAULT_CONTAINER_ID,
	planTitle = DEFAULT_PLAN_TITLE,
	theme = DEFAULT_THEME,
}) => {
	const { days, notes: mockNotes }: ActivitiesMockData = activitiesMockData;

	const containerClasses = getClassNames(
		styles["plan-container"],
		styles[theme],
	);

	return (
		<div className={containerClasses} id={containerId}>
			<div className={styles["plan-preview"]}>
				<h1 className={styles["plan-title"]}>{planTitle}</h1>

				<div className={styles["days-grid-container"]}>
					{days.map((day: Day, index: number) => (
						<div className={styles["day-block"]} key={day.id}>
							<h2 className={styles["day-topic"]}>
								Day {index + ONE}{" "}
								<span className={styles["day-weekday"]}>
									({getDayName(index)})
								</span>
							</h2>
							<div className={styles["activities-list"]}>
								{day.activities.map((activity: Activity) => (
									<div className={styles["activity-item"]} key={activity.id}>
										<span className={styles["activity-bullet"]}>
											{ACTIVITY_BULLET}
										</span>
										<span className={styles["activity-text"]}>
											{activity.text}
										</span>
									</div>
								))}
							</div>
						</div>
					))}
					<div
						className={getClassNames(
							styles["notes-section"],
							days.length % TWO === ZERO ? styles["notes-full-width"] : "",
						)}
					>
						<div className={styles["notes-title"]}>Notes:</div>
						<p className={styles["notes-description"]}>{mockNotes}</p>

						<div className={styles["notes-content"]}>
							<div className={styles["notes-lines"]}>
								{Array.from({ length: PLAN_NOTES_LINES }).map(
									(_, index: number) => (
										<div className={styles["notes-line"]} key={index} />
									),
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export { PlanDisplay };
