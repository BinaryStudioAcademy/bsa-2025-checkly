import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserDto } from "~/modules/users/users.js";

import {
	getCurrentUser,
	sendResetLink,
	signIn,
	signUp,
	updateProfile,
	verifyToken,
} from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	isPreparing: boolean;
	user: null | UserDto;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	isPreparing: true,
	user: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(signUp.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
			state.isPreparing = !initialState.isPreparing;
		});
		builder.addCase(signUp.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.user = action.payload;
		});
		builder.addCase(signUp.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.user = null;
		});

		builder.addCase(getCurrentUser.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
			state.isPreparing = initialState.isPreparing;
		});
		builder.addCase(getCurrentUser.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.user = action.payload;
		});
		builder.addCase(getCurrentUser.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.user = null;
		});

		builder.addCase(signIn.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
			state.isPreparing = !initialState.isPreparing;
		});
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.user = action.payload;
		});
		builder.addCase(signIn.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.user = null;
		});

		builder.addCase(updateProfile.fulfilled, (state, action) => {
			state.user = action.payload;
		});

		builder.addCase(sendResetLink.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
			state.isPreparing = !initialState.isPreparing;
		});
		builder.addCase(sendResetLink.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(sendResetLink.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(verifyToken.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
			state.isPreparing = initialState.isPreparing;
		});
		builder.addCase(verifyToken.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.isPreparing = !initialState.isPreparing;
		});
		builder.addCase(verifyToken.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.isPreparing = !initialState.isPreparing;
		});
	},
	initialState,
	name: "auth",
	reducers: {
		resetAuthState: (state) => {
			state.dataStatus = DataStatus.IDLE;
			state.user = null;
		},
	},
});

export { actions, name, reducer };
