import {
	create,
	deleteTask,
	updateTask,
	updateTasks,
} from "~/modules/tasks/slices/actions.js";
import { actions } from "~/modules/tasks/slices/task.slice.js";

const allActions = {
	...actions,
	create,
	deleteTask,
	updateTask,
	updateTasks,
};

export { allActions as actions };
export { reducer } from "~/modules/tasks/slices/task.slice.js";
