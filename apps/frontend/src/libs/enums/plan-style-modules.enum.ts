import { colorfulStyles } from "../components/plan-styles/styles/colorful/colorful.js";
import { minimalStyles } from "../components/plan-styles/styles/minimal/minimal.js";
import { withRemarksStyles } from "../components/plan-styles/styles/with-remarks/with-remarks.js";

const planStyleModules = {
	colorful: colorfulStyles,
	minimal: minimalStyles,
	withremarks: withRemarksStyles,
} as const;

export { planStyleModules };
