import { type PlanStyleModules } from "~/libs/enums/enums.js";
import { type PlanStyleOption } from "~/libs/types/types.js";

type StyleKey = keyof typeof PlanStyleModules;

const STYLE_MAPPING: Record<PlanStyleOption, StyleKey> = {
	colourful: "COLOURFUL",
	minimal: "MINIMAL",
	withremarks: "WITH_REMARKS",
} as const;

const getStyleKey = (style: PlanStyleOption): StyleKey => {
	return STYLE_MAPPING[style];
};

const useStyleKey = (): {
	getStyleKey: (style: PlanStyleOption) => StyleKey;
} => {
	return { getStyleKey };
};

export { useStyleKey };
