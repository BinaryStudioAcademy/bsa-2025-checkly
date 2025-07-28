import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { showErrorToast } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";

import {
	type UserSignInResponseDto,
	type UserSignUpResponseDto,
} from "../libs/types/types.js";
import { signIn, signUp } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	user: null | UserSignInResponseDto | UserSignUpResponseDto;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	user: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(signUp.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(signUp.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.user = action.payload.user;
		});
		builder.addCase(signUp.rejected, (state, action) => {
			state.dataStatus = DataStatus.REJECTED;
			state.user = null;
			showErrorToast(action.error.message as string);
		});

		builder.addCase(signIn.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.user = action.payload.user;
		});
		builder.addCase(signIn.rejected, (state, action) => {
			state.dataStatus = DataStatus.REJECTED;
			showErrorToast(action.error.message as string);
		});
	},
	initialState,
	name: "auth",
	reducers: {},
});

export { actions, name, reducer };
