import { createSlice } from "@reduxjs/toolkit";

import { colorValues, DataStatus } from "~/libs/enums/enums.js";

import { PLAN_CATEGORY } from "../libs/enums/enums.js";
import { assignColor } from "../libs/helpers/helpers.js";
import { type PlanCategoryState as State } from "../libs/types/types.js";
import { getAll } from "./actions.js";

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
			state.planCategories = action.payload.map((category) => ({
				...category,
				color: assignColor(category.id, colorValues),
			}));
		});
		builder.addCase(getAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.planCategories = [];
		});
	},
	initialState,
	name: PLAN_CATEGORY,
	reducers: {},
});

export { actions, name, reducer };
