import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type PlanDaysTaskDto } from "~/modules/plans/plans.js";

import {
	generatePlan,
	getPlan,
	regeneratePlanDay,
	regenerateTask,
} from "./actions.js";

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
		builder.addMatcher(
			isAnyOf(
				generatePlan.pending,
				getPlan.pending,
				regenerateTask.pending,
				regeneratePlanDay.pending,
			),
			(state) => {
				state.dataStatus = DataStatus.PENDING;
			},
		);
		builder.addMatcher(
			isAnyOf(
				generatePlan.fulfilled,
				getPlan.fulfilled,
				regenerateTask.fulfilled,
				regeneratePlanDay.fulfilled,
			),
			(state, action) => {
				state.dataStatus = DataStatus.FULFILLED;
				state.plan = action.payload;
			},
		);
		builder.addMatcher(
			isAnyOf(
				generatePlan.rejected,
				getPlan.rejected,
				regenerateTask.rejected,
				regeneratePlanDay.rejected,
			),
			(state) => {
				state.dataStatus = DataStatus.REJECTED;
				state.plan = null;
			},
		);
	},
	initialState,
	name: "plan",
	reducers: {},
});

export { actions, name, reducer };
