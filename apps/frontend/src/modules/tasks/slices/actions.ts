import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type TaskDto,
	type TaskUpdateRequestDto,
} from "~/modules/tasks/libs/types/types.js";
import { name as sliceName } from "~/modules/tasks/slices/task.slice.js";

const updateTask = createAsyncThunk<
	TaskDto,
	{ id: number; payload: TaskUpdateRequestDto },
	AsyncThunkConfig
>(`${sliceName}/update-task`, async ({ id, payload }, { extra }) => {
	const { taskApi } = extra;

	return await taskApi.update(id, payload);
});

const deleteTask = createAsyncThunk<
	number,
	number,
	AsyncThunkConfig
>(`${sliceName}/delete-task`, async (id, { extra }) => {
	const { taskApi } = extra;

	await taskApi.delete(id);
	
	return id;
});

export { deleteTask, updateTask };
