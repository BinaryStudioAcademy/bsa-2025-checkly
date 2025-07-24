import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type UserSignUpResponseDto } from "shared";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { signUp } from "./actions.js";

interface BackendErrorResponse {
	message: string;
	status: number;
}

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	error: BackendErrorResponse | null;
	user: null | UserSignUpResponseDto;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	error: null,
	user: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(signUp.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
			state.error = null;
		});
		builder.addCase(
			signUp.fulfilled,
			(state, action: PayloadAction<UserSignUpResponseDto>) => {
				state.dataStatus = DataStatus.FULFILLED;
				state.user = action.payload;
				state.error = null;
			},
		);
		builder.addCase(signUp.rejected, (state, action) => {
			state.dataStatus = DataStatus.REJECTED;
			state.user = null;

			if (
				action.payload &&
				typeof action.payload === "object" &&
				"message" in action.payload &&
				"status" in action.payload
			) {
				state.error = action.payload as BackendErrorResponse;
			} else if (action.error.message) {
				state.error = {
					message: action.error.message,
					status: 500,
				};
			} else {
				state.error = {
					message: "Unknown error! Try again later.",
					status: 500,
				};
			}
		});
	},
	initialState,
	name: "auth",
	reducers: {
		clearError(state) {
			state.error = null;
		},
	},
});

export { actions, name, reducer };
