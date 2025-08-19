import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type PlanDaysTaskDto } from "~/modules/plans/plans.js";

import { generatePlan, getPlan, regenerateTask } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	plan: null | PlanDaysTaskDto;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	plan: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(generatePlan.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(generatePlan.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.plan = action.payload;
		});
		builder.addCase(generatePlan.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.plan = null;
		});

		builder.addCase(getPlan.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getPlan.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.plan = action.payload;
		});
		builder.addCase(getPlan.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.plan = null;
		});

		builder.addCase(regenerateTask.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(regenerateTask.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.plan = action.payload;
		});
		builder.addCase(regenerateTask.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.plan = null;
		});
	},
	initialState,
	name: "plan",
	reducers: {},
});

export { actions, name, reducer };
