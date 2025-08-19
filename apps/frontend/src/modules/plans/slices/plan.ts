import {
	generatePlan,
	getPlan,
	regeneratePlanDay,
	regenerateTask,
} from "./actions.js";
import { actions } from "./plan.slice.js";

const allActions = {
	...actions,
	generatePlan,
	getPlan,
	regeneratePlanDay,
	regenerateTask,
};

export { allActions as actions };
export { reducer } from "./plan.slice.js";
