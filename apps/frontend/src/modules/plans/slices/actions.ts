import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type PlanDaysTaskDto } from "~/modules/plans/plans.js";

import { type QuizAnswersRequestDto } from "../libs/types/types.js";
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

const getPlan = createAsyncThunk<PlanDaysTaskDto, number, AsyncThunkConfig>(
	`${sliceName}/get`,
	async (payload, { extra }) => {
		const { planApi } = extra;

		const plan = await planApi.getByUserId(payload);

		return plan;
	},
);

const regenerateTask = createAsyncThunk<
	PlanDaysTaskDto,
	{ dayId: number; planId: number; taskId: number },
	AsyncThunkConfig
>(`${sliceName}/regenerate-task`, async (payload, { extra }) => {
	const { planApi } = extra;

	const plan = await planApi.regenerateTask(payload);

	return plan;
});

const regeneratePlanDay = createAsyncThunk<
	PlanDaysTaskDto,
	{ dayId: number; planId: number },
	AsyncThunkConfig
>(`${sliceName}/regenerate-plan-day`, async (payload, { extra }) => {
	const { planApi } = extra;

	const plan = await planApi.regeneratePlanDay(payload);

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
	getPlan,
	regeneratePlan,
	regeneratePlanDay,
	regenerateTask,
};
