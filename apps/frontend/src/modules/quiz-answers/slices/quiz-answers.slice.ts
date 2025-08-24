import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { saveAnswers } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	quizId?: number;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	quizId: undefined,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(saveAnswers.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(saveAnswers.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.quizId = action.payload;
		});
		builder.addCase(saveAnswers.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "quiz-answer",
	reducers: {},
});

export { actions, name, reducer };
