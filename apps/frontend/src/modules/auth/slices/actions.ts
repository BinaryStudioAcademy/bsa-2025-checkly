import { createAsyncThunk } from "@reduxjs/toolkit";

import { MESSAGES } from "~/libs/constants/messages.constants.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
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

type LogoutThunkArgument = { navigate: (path: string) => Promise<void> | void };

const logout = createAsyncThunk<null, LogoutThunkArgument, AsyncThunkConfig>(
	`${sliceName}/logout`,
	async ({ navigate }, { dispatch, extra }) => {
		const { notifications, storage } = extra;

		try {
			await storage.drop(StorageKey.TOKEN);
			dispatch(authSliceActions.resetAuthState());

			try {
				await Promise.resolve(navigate(AppRoute.SIGN_IN));
			} catch {
				notifications.error(MESSAGES.NAVIGATION.FAILED);
			}

			return null;
		} catch (error) {
			notifications.error(MESSAGES.AUTH.LOGOUT_FAILED);

			throw error;
		}
	},
);

export { getCurrentUser, logout, signIn, signUp };
