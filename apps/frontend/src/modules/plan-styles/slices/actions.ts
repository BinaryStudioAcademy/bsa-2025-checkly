import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type PlanStyleDto } from "../plan-styles.js";
import { name as sliceName } from "./plan-styles.js";

const fetchPlanStyles = createAsyncThunk<
	PlanStyleDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/fetchPlanStyles`, async (_, { extra }) => {
	const result = await extra.planStylesApi.getAll();

	return result;
});

export { fetchPlanStyles };
