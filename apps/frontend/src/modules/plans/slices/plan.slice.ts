import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { DataStatus, PlanStyleOptions } from "~/libs/enums/enums.js";
import { type PlanStyleOption, type ValueOf } from "~/libs/types/types.js";
import { type PlanDaysTaskDto } from "~/modules/plans/plans.js";

import { generatePlan, getAllUserPlans, searchPlan } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	plan: null | PlanDaysTaskDto;
	selectedStyle: PlanStyleOption;
	userPlans: PlanDaysTaskDto[];
	userPlansDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	plan: null,
	selectedStyle: PlanStyleOptions.WITH_REMARKS,
	userPlans: [],
	userPlansDataStatus: DataStatus.IDLE,
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
		builder.addCase(getAllUserPlans.pending, (state) => {
			state.userPlansDataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAllUserPlans.fulfilled, (state, action) => {
			state.userPlansDataStatus = DataStatus.FULFILLED;
			state.userPlans = action.payload;
		});
		builder.addCase(getAllUserPlans.rejected, (state) => {
			state.userPlansDataStatus = DataStatus.REJECTED;
			state.userPlans = [];
		});
		builder.addCase(searchPlan.pending, (state) => {
			state.userPlansDataStatus = DataStatus.PENDING;
		});
		builder.addCase(searchPlan.fulfilled, (state, action) => {
			state.userPlansDataStatus = DataStatus.FULFILLED;
			state.userPlans = action.payload;
		});
		builder.addCase(searchPlan.rejected, (state) => {
			state.userPlansDataStatus = DataStatus.REJECTED;
			state.userPlans = [];
		});
	},
	initialState,
	name: "plan",
	reducers: {
		setSelectedStyle: (state, action: PayloadAction<PlanStyleOption>) => {
			state.selectedStyle = action.payload;
		},
	},
});

export { actions, name, reducer };
