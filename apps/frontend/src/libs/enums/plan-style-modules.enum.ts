import withRemarksStyles from "../components/plan-styles/styles/with-remarks/styles.module.css";
import colourfulStyles from "../components/plan-styles/styles/with-remarks/themes/colourful/styles.module.css";
import minimalStyles from "../components/plan-styles/styles/with-remarks/themes/minimal/styles.module.css";

const PlanStyleModules = {
	COLOURFUL: colourfulStyles,
	MINIMAL: minimalStyles,
	WITH_REMARKS: withRemarksStyles,
} as const;

export { PlanStyleModules };
