import { exportPdf } from "./actions.js";
import { actions } from "./pdf-export.slice.js";

const allActions = {
	...actions,
	exportPdf,
};

export { allActions as actions };
export { reducer } from "./pdf-export.slice.js";
