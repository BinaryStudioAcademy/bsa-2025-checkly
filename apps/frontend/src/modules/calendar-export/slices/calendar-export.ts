import { exportCalendar } from "../slices.js";
import { actions } from "./calendar-export.slice.js";

const allActions = {
	...actions,
	exportCalendar,
};

export { allActions as actions };
export { reducer } from "./calendar-export.slice.js";
