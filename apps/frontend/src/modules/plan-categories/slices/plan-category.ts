import { getAll } from "./actions.js";
import { actions } from "./plan-category.slice.js";

const allActions = {
	...actions,
	getAll,
};

export { allActions as actions };
export { reducer } from "./plan-category.slice.js";
