import { http } from "~/libs/modules/api/mocks/http.js";
import { delay } from "msw";
import { HTTPCode } from "../libs/enums/enums.js";
import {
	ErrorMessage,
	MOCK_PLAN,
	MOCK_REGENERATED_TASK,
	NOT_FOUND_INDEX,
} from "../libs/constants/constants.js";

const updateTask = (
	plan: typeof MOCK_PLAN,
	dayId: string,
	taskId: string,
	regeneratedTask: typeof MOCK_REGENERATED_TASK,
): boolean => {
	const targetDay = plan.days?.find((day) => String(day.id) === dayId);
	if (!targetDay?.tasks) return false;

	const taskIndex = targetDay.tasks.findIndex(
		(task) => String(task.id) === taskId,
	);

	if (taskIndex === NOT_FOUND_INDEX) return false;

	targetDay.tasks[taskIndex] = regeneratedTask;
	return true;
};

const planTaskRegenerationHandlers = [
	http.post(
		"/plans/:planId/days/:dayId/tasks/:taskId/regenerate",
		async ({ params }) => {
			const { planId, dayId, taskId } = params;

			if (!planId || !dayId || !taskId) {
				return new Response(
					JSON.stringify({ error: ErrorMessage.MISSING_PARAMS }),
					{
						status: HTTPCode.BAD_REQUEST,
					},
				);
			}

			await delay(200);

			const updatedPlan = structuredClone(MOCK_PLAN);
			const regeneratedTask = { ...MOCK_REGENERATED_TASK, id: taskId };

			const replaced = updateTask(updatedPlan, dayId, taskId, regeneratedTask);
			if (!replaced) {
				return new Response(
					JSON.stringify({ error: ErrorMessage.TASK_NOT_FOUND }),
					{
						status: HTTPCode.NOT_FOUND,
					},
				);
			}

			return new Response(JSON.stringify(updatedPlan), { status: HTTPCode.OK });
		},
	),
];

export { planTaskRegenerationHandlers };
