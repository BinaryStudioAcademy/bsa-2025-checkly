import { type TaskDto } from "~/modules/tasks/tasks.js";

const getEditedTasks = (
	originTasks: TaskDto[],
	tasks: TaskDto[],
): TaskDto[] => {
	const editedTasks = tasks.filter(
		(task, index) => task.title !== originTasks[index]?.title,
	);

	return editedTasks;
};

export { getEditedTasks };
