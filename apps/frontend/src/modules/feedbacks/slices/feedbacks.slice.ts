import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type FeedbackDto } from "~/modules/feedbacks/feedbacks.js";
import { SINGLE_PAGE } from "~/pages/home/lib/constants.js";

import {
	createFeedback,
	deleteFeedback,
	fetchAllFeedbacks,
	fetchFeedbackById,
	updateFeedback,
} from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	error: null | string;
	feedbacks: FeedbackDto[];
	total: number;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	error: null,
	feedbacks: [],
	total: 0,
};

const NOT_FOUND_INDEX = -1;

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(fetchAllFeedbacks.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
			state.error = null;
		});
		builder.addCase(fetchAllFeedbacks.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			const { items, total } = action.payload;

			state.feedbacks =
				action.meta.arg.page === SINGLE_PAGE
					? items
					: [...state.feedbacks, ...items];

			state.total = total;
		});
		builder.addCase(fetchAllFeedbacks.rejected, (state, action) => {
			state.dataStatus = DataStatus.REJECTED;
			state.error = action.error.message || "Failed to fetch feedbacks.";
		});

		builder.addCase(fetchFeedbackById.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
			state.error = null;
		});
		builder.addCase(fetchFeedbackById.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			const index = state.feedbacks.findIndex(
				(f) => f.id === action.payload.id,
			);

			if (index === NOT_FOUND_INDEX) {
				state.feedbacks.push(action.payload);
			} else {
				state.feedbacks[index] = action.payload;
			}
		});
		builder.addCase(fetchFeedbackById.rejected, (state, action) => {
			state.dataStatus = DataStatus.REJECTED;
			state.error = action.error.message || "Failed to fetch feedback.";
		});

		builder.addCase(createFeedback.fulfilled, (state, action) => {
			state.feedbacks.unshift(action.payload);
			state.total += 1;
		});

		builder.addCase(updateFeedback.fulfilled, (state, action) => {
			const index = state.feedbacks.findIndex(
				(f) => f.id === action.payload.id,
			);

			if (index !== NOT_FOUND_INDEX) {
				state.feedbacks[index] = action.payload;
			}
		});

		builder.addCase(deleteFeedback.fulfilled, (state, action) => {
			state.feedbacks = state.feedbacks.filter((f) => f.id !== action.payload);
			state.total -= 1;
		});
	},
	initialState,
	name: "feedbacks",
	reducers: {},
});

export { actions, name, reducer };
