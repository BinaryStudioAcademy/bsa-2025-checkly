import React from "react";

import { PlanTemplate } from "~/assets/img/plan-style-overview/plan-style-overview.img.js";
import { type CategoryId } from "~/libs/constants/constants.js";

import styles from "./styles.module.css";

type Properties = {
	categoryId: CategoryId;
	planImage?: string;
	planTitle?: string;
};

const PlanDisplay: React.FC<Properties> = ({
	categoryId,
	planImage = PlanTemplate,
	planTitle = "Plan preview",
}) => {
	return (
		<div className={styles["plan-container"]}>
			<div className={styles["plan-preview"]}>
				<img
					alt={`${planTitle} for ${categoryId}`}
					className={styles["plan-image"]}
					src={planImage}
				/>
			</div>
		</div>
	);
};

export { PlanDisplay };
