import React from "react";
import { useSearchParams } from "react-router-dom";

import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { PlanStyle as PlanStyleEnum } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { type PlanStyleOption } from "~/libs/types/types.js";

import styles from "./styles.module.css";

const PlanStylePrint: React.FC = () => {
	const [searchParameters] = useSearchParams();
	const styleFromUrl = searchParameters.get("style");
	const inputStyle: PlanStyleOption = styleFromUrl
		? (styleFromUrl as PlanStyleOption)
		: PlanStyleEnum.WITH_REMARKS;

	const containerClassName = getClassNames(
		styles["print-container"],
		inputStyle === PlanStyleEnum.WITH_REMARKS &&
			styles["print-container--with-remarks"],
	);

	return (
		<div className={containerClassName} id="print-container">
			<PlanStyle inputStyle={inputStyle} />
		</div>
	);
};

export { PlanStylePrint };
