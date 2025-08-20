import { http } from "msw";
import { HTTPCode, TaskMessage } from "../libs/enums/enums.js";
import { TASK_INDEXES } from "~/modules/tasks/libs/constants/constants.js";
import { MOCK_TASKS } from "../libs/constants/constants.js";
import {
	TaskDto,
	type TaskUpdateRequestDto,
} from "~/modules/tasks/libs/types/types.js";

type TaskParams = {
	id: string;
};

const filterDefined = (obj: TaskUpdateRequestDto) =>
	Object.fromEntries(
		Object.entries(obj).filter(([_, value]) => value !== undefined),
	);

const mockTasksCopy: TaskDto[] = structuredClone(MOCK_TASKS);

export const taskHandlers = [
	http.patch("/api/v1/tasks/:id", async ({ request, params }) => {
		const { id } = params as TaskParams;
		const taskId = Number(id);
		const body = (await request.json()) as TaskUpdateRequestDto;

		const taskIndex = mockTasksCopy.findIndex((task) => task.id === taskId);

		if (taskIndex === TASK_INDEXES.TASK_INDEX_NOT_FOUND) {
			return new Response(
				JSON.stringify({ message: TaskMessage.TASK_NOT_FOUND }),
				{ status: HTTPCode.NOT_FOUND },
			);
		}

		mockTasksCopy[taskIndex] = {
			...mockTasksCopy[taskIndex],
			...filterDefined(body),
		} as TaskDto;

		return new Response(JSON.stringify(mockTasksCopy[taskIndex]), {
			status: HTTPCode.OK,
		});
	}),

	http.delete("/api/v1/tasks/:id", async ({ params }) => {
		const { id } = params as TaskParams;
		const taskId = Number(id);
		const taskIndex = mockTasksCopy.findIndex((task) => task.id === taskId);

		if (taskIndex === TASK_INDEXES.TASK_INDEX_NOT_FOUND) {
			return new Response(
				JSON.stringify({ message: TaskMessage.TASK_NOT_FOUND }),
				{ status: HTTPCode.NOT_FOUND },
			);
		}

		mockTasksCopy.splice(taskIndex, TASK_INDEXES.TASK_FIRST_INDEX);

		return new Response(JSON.stringify({ message: TaskMessage.TASK_DELETED }), {
			status: HTTPCode.OK,
		});
	}),
];
