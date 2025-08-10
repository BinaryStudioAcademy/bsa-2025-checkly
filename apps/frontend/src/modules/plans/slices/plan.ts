import { generate } from "./actions.js";
import { actions } from "./plan.slice.js";

const allActions = {
	...actions,
	generate,
};

export { allActions as actions };
export { reducer } from "./plan.slice.js";
