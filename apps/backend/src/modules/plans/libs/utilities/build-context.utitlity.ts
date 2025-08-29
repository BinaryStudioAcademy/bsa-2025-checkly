import { ONE, ZERO } from "~/libs/constants/constants.js";
import { type QuizContext } from "~/libs/types/types.js";

import { NEXT_DAYS, PREVIOUS_DAYS } from "../constants/constants.js";
import { type TaskDto } from "../types/types.js";

const buildExistingTasksContext = (context?: QuizContext): string => {
	if (!context) {
		return "";
	}

	const allTasks: TaskDto[] = [...(context.tasks ?? [])];

	if (context.days) {
		const { currentDayIndex, days } = context.days;

		const start = Math.max(currentDayIndex - PREVIOUS_DAYS, ZERO);
		const end = Math.min(currentDayIndex + NEXT_DAYS, days.length - ONE);

		const windowTasks = days
			.slice(start, end + ONE)
			.flatMap((day) => day.tasks);
		allTasks.push(...windowTasks);
	}

	if (allTasks.length === ZERO) {
		return "";
	}

	const tasksList = allTasks.map(
		(task, index) => `- Task #${String(index + ONE)}: ${task.title}`,
	);

	return `
### EXISTING TASKS CONTEXT ###
These are the tasks that already exist:
${tasksList.join("\n")}
`;
};

export { buildExistingTasksContext };
