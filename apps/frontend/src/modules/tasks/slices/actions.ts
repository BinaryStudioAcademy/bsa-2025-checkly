import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type TaskCreateRequestDto,
	type TaskDto,
	type TaskUpdateRequestDto,
} from "~/modules/tasks/libs/types/types.js";
import { name as sliceName } from "~/modules/tasks/slices/task.slice.js";

const create = createAsyncThunk<
	TaskDto,
	TaskCreateRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create-task`, async (payload, { extra }) => {
	const { taskApi } = extra;

	const updatedTasks = await taskApi.create(payload);

	return updatedTasks;
});

const updateTasks = createAsyncThunk<
	TaskDto[],
	Partial<TaskDto>[],
	AsyncThunkConfig
>(`${sliceName}/update-tasks`, async (payload, { extra }) => {
	const { taskApi } = extra;

	const updatedTasks = await taskApi.bulkUpdate(payload);

	return updatedTasks;
});

const updateTask = createAsyncThunk<
	TaskDto,
	{ id: number; payload: TaskUpdateRequestDto },
	AsyncThunkConfig
>(`${sliceName}/update-task`, async ({ id, payload }, { extra }) => {
	const { taskApi } = extra;

	return await taskApi.update(id, payload);
});

const deleteTask = createAsyncThunk<number, number, AsyncThunkConfig>(
	`${sliceName}/delete-task`,
	async (id, { extra }) => {
		const { taskApi } = extra;

		await taskApi.delete(id);

		return id;
	},
);

export { create, deleteTask, updateTask, updateTasks };
