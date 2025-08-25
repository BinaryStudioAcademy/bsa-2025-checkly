import { type PlanStyleOption } from "~/libs/types/types.js";
import { PlanStyle } from "~/modules/plan-styles/libs/enums/enums.js";

type PlanStyleMapping = Record<number, PlanStyleOption>;

const PLAN_STYLE_TO_READABLE: PlanStyleMapping = {
	[PlanStyle.COLOURFUL]: "COLOURFUL",
	[PlanStyle.MINIMAL]: "MINIMAL",
	[PlanStyle.WITH_REMARKS]: "WITH_REMARKS",
} as const;

const DEFAULT_PLAN_STYLE: PlanStyleOption = "WITH_REMARKS";

export { DEFAULT_PLAN_STYLE, PLAN_STYLE_TO_READABLE };
