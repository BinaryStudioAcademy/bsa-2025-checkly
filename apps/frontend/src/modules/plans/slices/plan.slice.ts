import { createSlice, isAnyOf, type PayloadAction } from "@reduxjs/toolkit";

import { DataStatus, PlanStyle } from "~/libs/enums/enums.js";
import { type PlanStyleOption, type ValueOf } from "~/libs/types/types.js";
import { type PlanDaysTaskDto } from "~/modules/plans/plans.js";

import {
	findPlan,
	generatePlan,
	getAllUserPlans,
	getPlan,
	regeneratePlan,
	regeneratePlanDay,
	regenerateTask,
	searchPlan,
} from "./actions.js";

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
	selectedStyle: PlanStyle.WITH_REMARKS,
	userPlans: [],
	userPlansDataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
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
		builder.addMatcher(
			isAnyOf(
				generatePlan.pending,
				getPlan.pending,
				regenerateTask.pending,
				regeneratePlanDay.pending,
				findPlan.pending,
				regeneratePlan.pending,
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
				findPlan.fulfilled,
				regeneratePlan.fulfilled,
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
				findPlan.rejected,
				regeneratePlan.rejected,
			),
			(state) => {
				state.dataStatus = DataStatus.REJECTED;
				state.plan = null;
			},
		);
	},
	initialState,
	name: "plan",
	reducers: {
		clearPlan(state) {
			state.plan = null;
			state.dataStatus = DataStatus.IDLE;
		},
		setPlan: (state, action: PayloadAction<PlanDaysTaskDto>) => {
			state.plan = action.payload;
		},
		setSelectedStyle: (state, action: PayloadAction<PlanStyleOption>) => {
			state.selectedStyle = action.payload;
		},
	},
});

export { actions, name, reducer };
