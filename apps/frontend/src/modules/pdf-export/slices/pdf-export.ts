import { exportDesktopPng, exportMobilePng, exportPdf } from "./actions.js";
import { actions } from "./pdf-export.slice.js";

const allActions = {
	...actions,
	exportDesktopPng,
	exportMobilePng,
	exportPdf,
};

export { allActions as actions };
export { reducer } from "./pdf-export.slice.js";
