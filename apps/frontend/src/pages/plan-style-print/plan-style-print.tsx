import React from "react";

import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import {
	type PlanStyleOption,
	ViewOption,
	type ViewOptions,
} from "~/libs/types/types.js";

import styles from "./styles.module.css";

const MIN_PAGE = 1;
const ALLOWED_STYLES: ReadonlyArray<PlanStyleOption> = [
	"WITH_REMARKS",
	"MINIMAL",
	"COLOURFUL",
] as const;

const ALLOWED_STYLES_STR = ALLOWED_STYLES as ReadonlyArray<string>;
const isPlanStyleOption = (v: string): v is PlanStyleOption =>
	ALLOWED_STYLES_STR.includes(v);

const VIEW_OPTIONS = Object.values(ViewOption) as ReadonlyArray<string>;
const isViewOption = (v: string): v is ViewOptions => VIEW_OPTIONS.includes(v);

const PlanStylePrint: React.FC = () => {
	const search = new URLSearchParams(globalThis.location.search);

	const requestedStyle = search.get("style") ?? "";
	const inputStyle: PlanStyleOption = isPlanStyleOption(requestedStyle)
		? requestedStyle
		: "WITH_REMARKS";

	const requested = search.get("view") ?? "";
	const viewStyle: ViewOptions = isViewOption(requested)
		? requested
		: ViewOption.REGULAR;

	const pageParameter = search.get("page");
	const parsed = pageParameter ? Number(pageParameter) : undefined;
	const page =
		Number.isFinite(parsed) && parsed !== undefined && parsed >= MIN_PAGE
			? Math.floor(parsed)
			: undefined;

	const titleFromUrl = search.get("title") ?? undefined;

	return (
		<div
			className={styles["print-container"]}
			data-plan-style={inputStyle}
			id="print-container"
		>
			<PlanStyle
				inputStyle={inputStyle}
				page={page}
				planTitle={titleFromUrl}
				view={viewStyle}
			/>
		</div>
	);
};

export { PlanStylePrint };
