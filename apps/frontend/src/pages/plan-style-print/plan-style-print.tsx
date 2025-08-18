import React from "react";

import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { type PlanStyleOption } from "~/libs/types/types.js";

import styles from "./styles.module.css";

const PlanStylePrint: React.FC = () => {
	const inputStyle: PlanStyleOption = "withremarks";

	return (
		<div className={styles["print-container"]} id="print-container">
			<PlanStyle inputStyle={inputStyle} />
		</div>
	);
};

export { PlanStylePrint };
