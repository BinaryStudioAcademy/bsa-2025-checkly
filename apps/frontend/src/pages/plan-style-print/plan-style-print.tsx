import React from "react";

import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { PlanStyle as PlanStyleEnum } from "~/libs/enums/enums.js";
import {
	type PlanStyleOption,
	VIEW_OPTIONS,
	type ViewOptions,
} from "~/libs/types/types.js";

import styles from "./styles.module.css";

const MIN_PAGE = 1;

const isPlanStyleOption = (v: string): v is PlanStyleOption =>
	v === PlanStyleEnum.WITH_REMARKS ||
	v === PlanStyleEnum.MINIMAL ||
	v === PlanStyleEnum.COLOURFUL;

const PlanStylePrint: React.FC = () => {
	const search = new URLSearchParams(globalThis.location.search);

	const requestedStyle = search.get("style") ?? "";
	const inputStyle: PlanStyleOption = isPlanStyleOption(requestedStyle)
		? requestedStyle
		: PlanStyleEnum.WITH_REMARKS;

	const requested = search.get("view") ?? "";
	const viewStyle: ViewOptions = (VIEW_OPTIONS as readonly string[]).includes(
		requested,
	)
		? (requested as ViewOptions)
		: "regular";

	const pageParameter = search.get("page");
	const parsed = pageParameter ? Number(pageParameter) : undefined;
	const page =
		Number.isFinite(parsed) && parsed !== undefined && parsed >= MIN_PAGE
			? Math.floor(parsed)
			: undefined;

	return (
		<div
			className={styles["print-container"]}
			data-plan-style={inputStyle}
			id="print-container"
		>
			<PlanStyle inputStyle={inputStyle} page={page} view={viewStyle} />
		</div>
	);
};

export { PlanStylePrint };
