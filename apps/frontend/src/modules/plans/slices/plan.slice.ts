import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { DataStatus, PlanStyle, ZERO } from "~/libs/enums/enums.js";
import { type PlanStyleOption, type ValueOf } from "~/libs/types/types.js";

import { type PlanWithCategoryDto } from "../libs/types/types.js";
import {
	findPlan,
	generatePlan,
	getAllUserPlans,
	searchPlan,
} from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	plan: null | PlanWithCategoryDto;
	selectedStyle: PlanStyleOption;
	userPlans: PlanWithCategoryDto[];
	userPlansDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	plan: null,
	selectedStyle: PlanStyle.WITH_REMARKS,
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
			state.plan = action.payload.at(ZERO) ?? null;
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
		builder.addCase(findPlan.pending, (state) => {
			state.userPlansDataStatus = DataStatus.PENDING;
		});
		builder.addCase(findPlan.fulfilled, (state, action) => {
			state.userPlansDataStatus = DataStatus.FULFILLED;
			state.plan = action.payload;
		});
		builder.addCase(findPlan.rejected, (state) => {
			state.userPlansDataStatus = DataStatus.REJECTED;
			state.plan = null;
		});
	},
	initialState,
	name: "plan",
	reducers: {
		setCurrentPlan: (state, action: PayloadAction<PlanWithCategoryDto>) => {
			state.plan = action.payload;
		},
		setSelectedStyle: (state, action: PayloadAction<PlanStyleOption>) => {
			state.selectedStyle = action.payload;
		},
	},
});

export { actions, name, reducer };
