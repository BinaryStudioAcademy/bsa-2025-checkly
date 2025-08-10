import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type PlanDaysTaskDto } from "~/modules/plans/plans.js";

import { generate } from "./actions.js";

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
		builder.addCase(generate.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(generate.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.plan = action.payload;
		});
		builder.addCase(generate.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.plan = null;
		});
	},
	initialState,
	name: "plan",
	reducers: {},
});

export { actions, name, reducer };
