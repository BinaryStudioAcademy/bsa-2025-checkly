import React from "react";

import { ONE } from "~/libs/constants/constants.js";

import styles from "./styles.module.css";

type Properties = {
	index: number;
};

const DaySkeleton: React.FC<Properties> = ({ index }) => {
	const dayNumber = index + ONE;

	return (
		<div className={styles["content__days-item"]}>
			<div className={styles["content__day-skeleton"]}>
				<div
					className={styles["skeleton-block"]}
				>{`Day ${String(dayNumber)}`}</div>
			</div>
		</div>
	);
};

export { DaySkeleton };
