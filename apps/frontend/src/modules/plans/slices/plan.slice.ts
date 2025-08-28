import { createSlice, isAnyOf, type PayloadAction } from "@reduxjs/toolkit";
import { type TaskDto } from "shared";

import { DataStatus, PlanStyle, ZERO } from "~/libs/enums/enums.js";
import { type PlanStyleOption, type ValueOf } from "~/libs/types/types.js";

import { type PlanWithCategoryDto } from "../libs/types/types.js";
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
	days: null | number;
	plan: null | PlanWithCategoryDto;
	selectedStyle: PlanStyleOption;
	userPlans: PlanWithCategoryDto[];
	userPlansDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	days: null,
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

			if (!state.plan) {
				state.plan = action.payload.at(ZERO) ?? null;
			}
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
			state.plan = action.payload.at(ZERO) ?? null;
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
				state.days = action.payload.duration;
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
		deleteTaskFromPlan: (
			state,
			action: PayloadAction<{ dayIndex: number; taskId: number }>,
		) => {
			const { dayIndex, taskId } = action.payload;

			if (state.plan?.days[dayIndex]) {
				state.plan.days[dayIndex].tasks = state.plan.days[
					dayIndex
				].tasks.filter((task) => task.id !== taskId);
			}
		},
		setCurrentPlan: (state, action: PayloadAction<PlanWithCategoryDto>) => {
			state.plan = action.payload;
		},
		setSelectedStyle: (state, action: PayloadAction<PlanStyleOption>) => {
			state.selectedStyle = action.payload;
		},
		updateTaskInPlan: (
			state,
			action: PayloadAction<{
				dayIndex: number;
				task: TaskDto;
				taskIndex: number;
			}>,
		) => {
			const { dayIndex, task, taskIndex } = action.payload;

			if (state.plan?.days[dayIndex]?.tasks[taskIndex]) {
				state.plan.days[dayIndex].tasks[taskIndex] = task;
			}
		},
	},
});

export { actions, name, reducer };
