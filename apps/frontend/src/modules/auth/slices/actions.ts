import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

import { name as sliceName } from "./auth.slice.js";

const signIn = createAsyncThunk<
	{ token: string; user: UserSignInResponseDto },
	UserSignInRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-in`, async (registerPayload, { extra }) => {
	const { authApi, storage } = extra;
	const responce = await authApi.signIn(registerPayload);
	await storage.set("token", responce.token);

	return responce;
});

const signUp = createAsyncThunk<
	{ token: string; user: UserSignUpResponseDto },
	UserSignUpRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra }) => {
	const { authApi, storage } = extra;
	const responce = await authApi.signUp(registerPayload);
	await storage.set("token", responce.token);

	return responce;
});

export { signIn, signUp };
