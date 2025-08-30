import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type PlanStyleDto } from "~/modules/plan-styles/libs/types/types.js";

import { fetchPlanStyles } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	styles: PlanStyleDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	styles: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(fetchPlanStyles.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(fetchPlanStyles.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.styles = action.payload;
		});
		builder.addCase(fetchPlanStyles.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.styles = [];
		});
	},
	initialState,
	name: "planStyles",
	reducers: {},
});

export { actions, name, reducer };
