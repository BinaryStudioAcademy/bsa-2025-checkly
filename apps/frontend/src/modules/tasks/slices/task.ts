import { deleteTask, updateTask } from "~/modules/tasks/slices/actions.js";
import { actions } from "~/modules/tasks/slices/task.slice.js";

const allActions = {
	...actions,
	deleteTask,
	updateTask,
};

export { allActions as actions };
export { reducer } from "~/modules/tasks/slices/task.slice.js";
