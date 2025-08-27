import {
	findPlan,
	generatePlan,
	getAllUserPlans,
	getPlan,
	regeneratePlan,
	regeneratePlanDay,
	regenerateTask,
} from "./actions.js";
import { actions } from "./plan.slice.js";

const allActions = {
	...actions,
	findPlan,
	generatePlan,
	getAllUserPlans,
	getPlan,
	regeneratePlan,
	regeneratePlanDay,
	regenerateTask,
};

export { allActions as actions };
export { reducer } from "./plan.slice.js";
