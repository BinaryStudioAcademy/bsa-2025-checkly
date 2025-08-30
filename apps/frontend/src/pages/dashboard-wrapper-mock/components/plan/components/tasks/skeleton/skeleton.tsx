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
				styles["content__tasks-item"],
				"wrapper",
				sharedStyles[`color-${String(indexItem)}`],
			)}
		>
			<h3 aria-hidden="true" className={styles["skeleton-circle-large"]} />
			<div className={sharedStyles["description-wrapper"]}>
				<h5 aria-hidden="true" className={styles["skeleton-box"]} />
			</div>
			<div className={sharedStyles["item-actions"]}>
				<div className={styles["skeleton-item-time"]} />
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
