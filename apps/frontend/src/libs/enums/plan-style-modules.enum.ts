import withRemarksStyles from "../components/plan-styles/styles/with-remarks/styles.module.css";
import colourfulStyles from "../components/plan-styles/styles/with-remarks/themes/colourful/styles.module.css";
import minimalStyles from "../components/plan-styles/styles/with-remarks/themes/minimal/styles.module.css";

const planStyleModules = {
	colourful: colourfulStyles,
	minimal: minimalStyles,
	withremarks: withRemarksStyles,
} as const;

export { planStyleModules };
