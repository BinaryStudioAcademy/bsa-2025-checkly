import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type PlanCategoryDto } from "../plan-categories.js";
import { name as sliceName } from "./plan-category.slice.js";

const getAll = createAsyncThunk<PlanCategoryDto[], undefined, AsyncThunkConfig>(
	`${sliceName}/get-all`,
	async (_, { extra }) => {
		const { planCategoryApi } = extra;

		return await planCategoryApi.getAll();
	},
);

export { getAll };
