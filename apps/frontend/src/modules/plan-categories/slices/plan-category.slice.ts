import { createSlice } from "@reduxjs/toolkit";

import { colorValues, DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type PlanCategoryDto } from "../libs/types/types.js";
import { getAll } from "./actions.js";

const assignColor = (id: number, colorValues: string[]): string =>
	colorValues[id % colorValues.length] as string;

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	planCategories: (PlanCategoryDto & { color: string })[];
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
	name: "plan-category",
	reducers: {},
});

export { actions, name, reducer };
