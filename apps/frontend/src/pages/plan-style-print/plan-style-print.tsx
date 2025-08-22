import React from "react";

import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import {
	type PlanStyleOption,
	VIEW_OPTIONS,
	type ViewOptions,
} from "~/libs/types/types.js";

import styles from "./styles.module.css";

const PlanStylePrint: React.FC = () => {
	const inputStyle: PlanStyleOption = "WITH_REMARKS";
	const requested =
		new URLSearchParams(globalThis.location.search).get("view") ?? "";
	const viewStyle: ViewOptions = (VIEW_OPTIONS as readonly string[]).includes(
		requested,
	)
		? (requested as ViewOptions)
		: "regular";

	return (
		<div className={styles["print-container"]} id="print-container">
			<PlanStyle inputStyle={inputStyle} view={viewStyle} />
		</div>
	);
};

export { PlanStylePrint };
