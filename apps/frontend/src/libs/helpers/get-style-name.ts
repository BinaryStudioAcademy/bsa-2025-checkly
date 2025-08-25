import { type PlanStyleOption } from "~/libs/types/types.js";
import {
	DEFAULT_PLAN_STYLE,
	PLAN_STYLE_TO_READABLE,
} from "~/modules/plan-styles/libs/constants/plan-style.constants.js";

const getPlanStyleName = (styleId: number): PlanStyleOption => {
	return PLAN_STYLE_TO_READABLE[styleId] ?? DEFAULT_PLAN_STYLE;
};

export { getPlanStyleName };
