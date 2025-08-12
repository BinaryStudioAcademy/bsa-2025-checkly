import colorfulStyles from "../components/plan-styles/styles/colorful/styles.module.css";
import minimalStyles from "../components/plan-styles/styles/minimal/styles.module.css";
import withRemarksStyles from "../components/plan-styles/styles/with-remarks/styles.module.css";

const planStyleModules = {
	colorful: colorfulStyles,
	minimal: minimalStyles,
	withremarks: withRemarksStyles,
} as const;

export { planStyleModules };
