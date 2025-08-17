import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { TaskConstants } from "~/modules/tasks/libs/enums/enums.js";
import { type TaskDto } from "~/modules/tasks/libs/types/types.js";

import { deleteTask, updateTask } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	tasks: TaskDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	tasks: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(updateTask.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(updateTask.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;

			const taskIndex = state.tasks.findIndex(
				(task) => task.id === action.payload.id,
			);

			if (taskIndex >= TaskConstants.TASK_ZERO_INDEX) {
				state.tasks[taskIndex] = action.payload;
			} else {
				state.tasks.push(action.payload);
			}
		});
		builder.addCase(updateTask.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(deleteTask.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(deleteTask.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.tasks = state.tasks.filter((task) => task.id !== action.meta.arg);
		});
		builder.addCase(deleteTask.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "task",
	reducers: {
		setTasks: (state, action: PayloadAction<TaskDto[]>) => {
			state.tasks = action.payload;
		},
	},
});

export { actions, name, reducer };
