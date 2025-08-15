import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type PlanDaysTaskDto } from "~/modules/plans/plans.js";

import {
	type PlanWithCategoryDto,
	type QuizAnswersRequestDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./plan.slice.js";

const generatePlan = createAsyncThunk<
	PlanDaysTaskDto,
	QuizAnswersRequestDto,
	AsyncThunkConfig
>(`${sliceName}/generate`, async (payload, { extra }) => {
	const { planApi } = extra;
	const plan = await planApi.generate(payload);

	return plan;
});

const searchPlan = createAsyncThunk<
	PlanWithCategoryDto[],
	{
		categoryId?: number | undefined;
		title?: string | undefined;
	},
	AsyncThunkConfig
>(`${sliceName}/search`, async (payload, { extra }) => {
	const { planApi } = extra;
	const plan = await planApi.search(payload);

	return plan;
});

const getAllUserPlans = createAsyncThunk<
	PlanDaysTaskDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/getAllUserPlans`, async (_, { extra }) => {
	const { planApi } = extra;
	const plan = await planApi.getAllUserPlans();

	return plan;
});

export { generatePlan, getAllUserPlans, searchPlan };
