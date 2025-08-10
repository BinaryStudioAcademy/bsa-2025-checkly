import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type PlanDaysTaskDto } from "~/modules/plans/plans.js";

import { type QuizAnswersDto } from "../libs/types/types.js";
import { name as sliceName } from "./plan.slice.js";

const generate = createAsyncThunk<
	PlanDaysTaskDto,
	QuizAnswersDto,
	AsyncThunkConfig
>(`${sliceName}/generate`, async (payload, { extra }) => {
	const { planApi } = extra;

	const plan = await planApi.generate(payload);

	return plan;
});

export { generate };
