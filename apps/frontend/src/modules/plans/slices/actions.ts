import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type PlanDayRegenerationRequestDto,
	type PlanDaysTaskDto,
	type PlanSearchQueryParameter,
	type PlanWithCategoryDto,
	type QuizAnswersRequestDto,
	type TaskRegenerationRequestDto,
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

const getPlan = createAsyncThunk<PlanDaysTaskDto, undefined, AsyncThunkConfig>(
	`${sliceName}/get`,
	async (_, { extra }) => {
		const { planApi } = extra;

		const plan = await planApi.getByUserId();

		return plan;
	},
);

const regenerateTask = createAsyncThunk<
	PlanDaysTaskDto,
	TaskRegenerationRequestDto,
	AsyncThunkConfig
>(`${sliceName}/regenerate-task`, async (payload, { extra }) => {
	const { planApi } = extra;

	const plan = await planApi.regenerateTask(payload);

	return plan;
});

const searchPlan = createAsyncThunk<
	PlanWithCategoryDto[],
	PlanSearchQueryParameter,
	AsyncThunkConfig
>(`${sliceName}/search`, async (payload, { extra }) => {
	const { planApi } = extra;
	const plan = await planApi.search(payload);

	return plan;
});

const regeneratePlanDay = createAsyncThunk<
	PlanDaysTaskDto,
	PlanDayRegenerationRequestDto,
	AsyncThunkConfig
>(`${sliceName}/regenerate-plan-day`, async (payload, { extra }) => {
	const { planApi } = extra;

	const plan = await planApi.regeneratePlanDay(payload);

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

const regeneratePlan = createAsyncThunk<
	PlanDaysTaskDto,
	number,
	AsyncThunkConfig
>(`${sliceName}/regenerate-plan`, async (payload, { extra }) => {
	const { planApi } = extra;

	const plan = await planApi.regeneratePlan(payload);

	return plan;
});

export {
	generatePlan,
	getAllUserPlans,
	getPlan,
	regeneratePlan,
	regeneratePlanDay,
	regenerateTask,
	searchPlan,
};
