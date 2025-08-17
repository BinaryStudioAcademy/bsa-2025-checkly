import { http } from "msw";
import { HTTPCode, TaskMessage } from "../libs/enums/enums.js";
import { TaskConstants } from "~/modules/tasks/libs/enums/enums.js";
import { MOCK_TASKS } from "../libs/constants/constants.js";
import { type TaskUpdateRequestDto } from "~/modules/tasks/libs/types/types.js";

type TaskParams = {
	id: string;
};

const filterDefined = (obj: TaskUpdateRequestDto) =>
	Object.fromEntries(
		Object.entries(obj).filter(([_, value]) => value !== undefined),
	);

export const taskHandlers = [
	http.patch("/api/v1/tasks/:id", async ({ request, params }) => {
		const { id } = params as TaskParams;
		const taskId = Number(id);
		const body = (await request.json()) as TaskUpdateRequestDto;

		const taskIndex = MOCK_TASKS.findIndex((task) => task.id === taskId);

		if (taskIndex === TaskConstants.TASK_INDEX_NOT_FOUND) {
			return new Response(
				JSON.stringify({ message: TaskMessage.TASK_NOT_FOUND }),
				{ status: HTTPCode.NOT_FOUND },
			);
		}

		MOCK_TASKS[taskIndex] = {
			...MOCK_TASKS[taskIndex],
			...filterDefined(body),
		} as (typeof MOCK_TASKS)[typeof taskIndex];

		return new Response(JSON.stringify(MOCK_TASKS[taskIndex]), {
			status: HTTPCode.OK,
		});
	}),

	http.delete("/api/v1/tasks/:id", async ({ params }) => {
		const { id } = params as TaskParams;
		const taskId = Number(id);
		const taskIndex = MOCK_TASKS.findIndex((task) => task.id === taskId);

		if (taskIndex === TaskConstants.TASK_INDEX_NOT_FOUND) {
			return new Response(
				JSON.stringify({ message: TaskMessage.TASK_NOT_FOUND }),
				{ status: HTTPCode.NOT_FOUND },
			);
		}

		MOCK_TASKS.splice(taskIndex, TaskConstants.TASK_FIRST_INDEX);

		return new Response(JSON.stringify({ message: TaskMessage.TASK_DELETED }), {
			status: HTTPCode.OK,
		});
	}),
];
