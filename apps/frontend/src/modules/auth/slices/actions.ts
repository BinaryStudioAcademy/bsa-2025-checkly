import { createAsyncThunk } from "@reduxjs/toolkit";

import { MESSAGES } from "~/libs/constants/messages.constants.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { ErrorMessage } from "~/libs/enums/enums.js";
import { HTTPError } from "~/libs/modules/http/http.js";
import { StorageKey } from "~/libs/modules/storage/storage.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type ForgotPasswordRequestDto,
	type ResetPasswordRequestDto,
	type UserDto,
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
	type UserUpdateRequestDto,
} from "~/modules/users/users.js";

import { authApi } from "../auth.js";
import {
	type LogoutThunkArgument,
	type VerifyTokenThunkArgument,
} from "../libs/types/types.js";
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

const sendResetLink = createAsyncThunk<
	null,
	ForgotPasswordRequestDto,
	AsyncThunkConfig
>(`${sliceName}/send-reset-link`, async (registerPayload) => {
	return await authApi.sendResetLink(registerPayload);
});

const verifyToken = createAsyncThunk<
	null,
	VerifyTokenThunkArgument,
	AsyncThunkConfig
>(
	`${sliceName}/verify-token`,
	async ({ navigate, token, userId }, { rejectWithValue }) => {
		try {
			await authApi.verifyToken({ token, userId });
		} catch (error) {
			const errorMessage =
				error instanceof HTTPError
					? error.message
					: ErrorMessage.DEFAULT_ERROR_MESSAGE;
			await navigate(AppRoute.ROOT);

			return rejectWithValue(errorMessage);
		}

		return null;
	},
);

const resetPassword = createAsyncThunk<
	null,
	ResetPasswordRequestDto,
	AsyncThunkConfig
>(
	`${sliceName}/reset-password`,
	async ({ password, userId }, { rejectWithValue }) => {
		try {
			await authApi.resetPassword({ password, userId });
		} catch (error) {
			const errorMessage =
				error instanceof HTTPError
					? error.message
					: ErrorMessage.DEFAULT_ERROR_MESSAGE;

			return rejectWithValue(errorMessage);
		}

		return null;
	},
);

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

const updateProfile = createAsyncThunk<
	UserDto,
	UserUpdateRequestDto,
	AsyncThunkConfig
>(
	`${sliceName}/update-profile`,
	async (payload, { extra, rejectWithValue }) => {
		const { userApi } = extra;

		try {
			return await userApi.updateMe(payload);
		} catch (error) {
			if (error instanceof HTTPError) {
				return rejectWithValue(error.message);
			}

			return rejectWithValue(ErrorMessage.DEFAULT_ERROR_MESSAGE);
		}
	},
);

const logout = createAsyncThunk<null, LogoutThunkArgument, AsyncThunkConfig>(
	`${sliceName}/logout`,
	async ({ navigate }, { dispatch, extra }) => {
		const { notifications, storage } = extra;

		try {
			await storage.drop(StorageKey.TOKEN);
		} catch {
			notifications.error(MESSAGES.AUTH.LOGOUT_FAILED);
		}

		dispatch(authSliceActions.resetAuthState());

		await navigate(AppRoute.ROOT);

		return null;
	},
);

export {
	getCurrentUser,
	logout,
	resetPassword,
	sendResetLink,
	signIn,
	signUp,
	updateProfile,
	verifyToken,
};
