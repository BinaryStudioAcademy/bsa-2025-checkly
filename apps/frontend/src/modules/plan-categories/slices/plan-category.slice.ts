import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type PlanCategoryDto } from "../libs/types/types.js";
import { getAll } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	planCategories: PlanCategoryDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	planCategories: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAll.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.planCategories = action.payload;
		});
		builder.addCase(getAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.planCategories = [];
		});
	},
	initialState,
	name: "plan-category",
	reducers: {},
});

export { actions, name, reducer };
