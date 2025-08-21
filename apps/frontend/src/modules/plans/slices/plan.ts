import { findPlan, generatePlan, getAllUserPlans } from "./actions.js";
import { actions } from "./plan.slice.js";

const allActions = {
	...actions,
	findPlan,
	generatePlan,
	getAllUserPlans,
};

export { allActions as actions };
export { reducer } from "./plan.slice.js";
