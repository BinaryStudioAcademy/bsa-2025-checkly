import React from "react";

import { getClassNames } from "~/libs/helpers/helpers.js";

import sharedStyles from "../../shared/task/styles.module.css";
import styles from "./styles.module.css";

type Properties = {
	indexItem: number;
};

const TaskSkeleton: React.FC<Properties> = ({ indexItem }) => {
	return (
		<div
			className={getClassNames(
				sharedStyles["content__tasks-item"],
				"wrapper",
				sharedStyles[`color-${String(indexItem)}`],
			)}
		>
			<h3 aria-hidden="true" className={styles["skeleton-box"]} />
			<div className={styles["description-wrapper"]}>
				<h5 className={styles["skeleton-box"]}>
					Task generation title skeleton
				</h5>
				<p className={styles["skeleton-box"]}>Task description skeleton</p>
			</div>
			<div className={sharedStyles["item-actions"]}>
				<div className={styles["item-actions__time"]} />
				<div className={sharedStyles["item-actions_buttons-wrapper"]}>
					<div className={styles["skeleton-circle"]} />
					<div className={styles["skeleton-circle"]} />
					<div className={styles["skeleton-circle"]} />
				</div>
			</div>
		</div>
	);
};

export { TaskSkeleton };
