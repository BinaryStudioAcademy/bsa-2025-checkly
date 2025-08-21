import { createAsyncThunk } from "@reduxjs/toolkit";

import { StorageKey } from "~/libs/modules/storage/storage.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type PlanDaysTaskDto } from "~/modules/plans/plans.js";

import {
	type GeneratePlanRequestDto,
	type PlanSearchQueryParameter,
	type PlanWithCategoryDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./plan.slice.js";

const generatePlan = createAsyncThunk<
	PlanDaysTaskDto,
	GeneratePlanRequestDto,
	AsyncThunkConfig
>(`${sliceName}/generate`, async (payload, { extra }) => {
	const { planApi, storage } = extra;
	const plan = await planApi.generate(payload);

	if (!plan.userId) {
		await storage.set(StorageKey.PLAN_ID, String(plan.id));
	}

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

const getAllUserPlans = createAsyncThunk<
	PlanDaysTaskDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/getAllUserPlans`, async (_, { extra }) => {
	const { planApi } = extra;
	const plan = await planApi.getAllUserPlans();

	return plan;
});

const findPlan = createAsyncThunk<PlanDaysTaskDto, number, AsyncThunkConfig>(
	`${sliceName}/:id`,
	async (payload, { extra }) => {
		const { planApi } = extra;
		const plan = await planApi.findWithRelations(payload);

		return plan;
	},
);

export { findPlan, generatePlan, getAllUserPlans, searchPlan };
