import { generatePlan, getPlan, regenerateTask } from "./actions.js";
import { actions } from "./plan.slice.js";

const allActions = {
	...actions,
	generatePlan,
	getPlan,
	regenerateTask,
};

export { allActions as actions };
export { reducer } from "./plan.slice.js";
