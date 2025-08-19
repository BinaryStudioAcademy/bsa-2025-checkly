import {
	generatePlan,
	getPlan,
	regeneratePlan,
	regeneratePlanDay,
	regenerateTask,
} from "./actions.js";
import { actions } from "./plan.slice.js";

const allActions = {
	...actions,
	generatePlan,
	getPlan,
	regeneratePlan,
	regeneratePlanDay,
	regenerateTask,
};

export { allActions as actions };
export { reducer } from "./plan.slice.js";
