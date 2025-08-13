import { generatePlan } from "./actions.js";
import { actions } from "./plan.slice.js";

const allActions = {
	...actions,
	generatePlan,
};

export { allActions as actions };
export { reducer } from "./plan.slice.js";
