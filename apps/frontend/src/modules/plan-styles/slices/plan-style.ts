import { fetchPlanStyles } from "./actions.js";
import { actions } from "./plan-styles.js";

const allActions = {
	...actions,
	fetchPlanStyles,
};

export { allActions as actions };
export { reducer } from "./plan-styles.js";
