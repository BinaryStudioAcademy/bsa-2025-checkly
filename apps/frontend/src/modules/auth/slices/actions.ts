import { createAsyncThunk } from "@reduxjs/toolkit";

import { ErrorMessage } from "~/libs/enums/enums.js";
import { StorageKey } from "~/libs/modules/storage/storage.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type UserDto,
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/modules/users/users.js";

import {
	actions as authSliceActions,
	name as sliceName,
} from "./auth.slice.js";

const signIn = createAsyncThunk<
	UserDto,
	UserSignInRequestDto,
	AsyncThunkConfig
>(
	`${sliceName}/sign-in`,
	async (registerPayload, { extra, rejectWithValue }) => {
		const { authApi, storage } = extra;

		try {
			const { token, user } = await authApi.signIn(registerPayload);
			await storage.set(StorageKey.TOKEN, token);

			return user;
		} catch {
			return rejectWithValue(ErrorMessage.INVALID_CREDENTIALS);
		}
	},
);

const signUp = createAsyncThunk<
	UserDto,
	UserSignUpRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra }) => {
	const { authApi, storage } = extra;

	const { token, user } = await authApi.signUp(registerPayload);
	await storage.set(StorageKey.TOKEN, token);

	return user;
});

const getCurrentUser = createAsyncThunk<
	null | UserDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-current-user`, async (_, { extra }) => {
	const { authApi, storage } = extra;

	const token = await storage.get(StorageKey.TOKEN);

	if (!token) {
		return null;
	}

	return await authApi.getCurrentUser();
});

const logout = createAsyncThunk<null, undefined, AsyncThunkConfig>(
	`${sliceName}/logout`,
	async (_, { dispatch, extra }) => {
		const { storage } = extra;
		await storage.drop(StorageKey.TOKEN);
		dispatch(authSliceActions.resetAuthState());

		return null;
	},
);

export { getCurrentUser, logout, signIn, signUp };
