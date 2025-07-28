import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type UserGetAllResponseDto } from "~/modules/users/users.js";

import { UserToastMessages } from "../libs/enums/enums.js";
import { name as sliceName } from "./users.slice.js";

const loadAll = createAsyncThunk<
	UserGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra }) => {
	const { toastNotifier, userApi } = extra;
	const result = await userApi.getAll();

	toastNotifier.success(UserToastMessages.GET_ALL_USERS_SUCCESS);

	return result;
});

export { loadAll };
