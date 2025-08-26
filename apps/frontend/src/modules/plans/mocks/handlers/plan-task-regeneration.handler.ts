import { http } from "~/libs/modules/api/mocks/http.js";
import { delay } from "msw";
import { HTTPCode } from "../libs/enums/enums.js";
import {
	ErrorMessage,
	MOCK_PLAN,
	MOCK_ANSWERS,
	MOCK_REGENERATED_TASK,
	MOCK_CATEGORY,
	NOT_FOUND_INDEX,
	MIN_DELAY_MS,
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

	targetDay.tasks[taskIndex] = {
		...regeneratedTask,
		id: Number(taskId),
		planDayId: Number(dayId),
	};
	return true;
};

const planTaskRegenerationHandlers = [
	http.patch(
		"/plans/:planId/days/:dayId/tasks/:taskId/regenerate",
		async ({ params }) => {
			const { planId, dayId, taskId } = params;

			if (!planId || !dayId || !taskId) {
				return Response.json(
					{ error: ErrorMessage.MISSING_PARAMS },
					{ status: HTTPCode.BAD_REQUEST },
				);
			}

			await delay(MIN_DELAY_MS);

			const existingPlan =
				MOCK_PLAN.id?.toString() === planId ? MOCK_PLAN : null;
			if (!existingPlan) {
				return Response.json(
					{ error: ErrorMessage.PLAN_NOT_FOUND },
					{ status: HTTPCode.NOT_FOUND },
				);
			}

			const existingDay = existingPlan.days?.find(
				(d) => String(d.id) === dayId,
			);

			if (!existingDay || Number(existingDay.planId) !== Number(planId)) {
				return Response.json(
					{ error: ErrorMessage.PLAN_DAY_NOT_FOUND },
					{ status: HTTPCode.NOT_FOUND },
				);
			}

			const existingTask = existingDay.tasks?.find(
				(t) => String(t.id) === taskId,
			);

			if (!existingTask || Number(existingTask.planDayId) !== Number(dayId)) {
				return Response.json(
					{ error: ErrorMessage.TASK_NOT_FOUND },
					{ status: HTTPCode.NOT_FOUND },
				);
			}

			if (!MOCK_ANSWERS.length) {
				return Response.json(
					{ error: ErrorMessage.ANSWERS_NOT_FOUND },
					{ status: HTTPCode.NOT_FOUND },
				);
			}

			if (!MOCK_CATEGORY) {
				return Response.json(
					{ error: ErrorMessage.CATEGORY_NOT_FOUND },
					{ status: HTTPCode.NOT_FOUND },
				);
			}

			const regeneratedTask = {
				...MOCK_REGENERATED_TASK,
				title: `${MOCK_CATEGORY.title} - Regenerated Task`,
			};

			const updatedPlan = structuredClone(MOCK_PLAN);
			const replaced = updateTask(updatedPlan, dayId, taskId, regeneratedTask);

			if (!replaced) {
				return Response.json(
					{ error: ErrorMessage.TASK_NOT_FOUND },
					{ status: HTTPCode.NOT_FOUND },
				);
			}

			return Response.json(updatedPlan, { status: HTTPCode.OK });
		},
	),
];

export { planTaskRegenerationHandlers };
