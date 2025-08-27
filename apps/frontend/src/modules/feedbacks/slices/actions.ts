import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type FeedbackCreateRequestDto,
	type FeedbackDto,
	type FeedbackUpdateRequestDto,
	type Pagination,
} from "~/modules/feedbacks/feedbacks.js";
import { name as sliceName } from "~/modules/feedbacks/slices/feedbacks.slice.js";

const fetchAllFeedbacks = createAsyncThunk<
	Pagination<FeedbackDto>,
	{ limit: number; page: number },
	AsyncThunkConfig
>(
	`${sliceName}/fetch-all-feedbacks`,
	async (paginationParameters, { extra }) => {
		const { feedbackApi } = extra;

		return await feedbackApi.findAll(paginationParameters);
	},
);

const fetchFeedbackById = createAsyncThunk<
	FeedbackDto,
	number,
	AsyncThunkConfig
>(`${sliceName}/fetch-feedback-by-id`, async (id, { extra }) => {
	const { feedbackApi } = extra;

	return await feedbackApi.findById(id);
});

const createFeedback = createAsyncThunk<
	FeedbackDto,
	FeedbackCreateRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create-feedback`, async (payload, { extra }) => {
	const { feedbackApi } = extra;

	return await feedbackApi.create(payload);
});

const updateFeedback = createAsyncThunk<
	FeedbackDto,
	{ id: number; payload: FeedbackUpdateRequestDto },
	AsyncThunkConfig
>(`${sliceName}/update-feedback`, async ({ id, payload }, { extra }) => {
	const { feedbackApi } = extra;

	return await feedbackApi.update(id, payload);
});

const deleteFeedback = createAsyncThunk<number, number, AsyncThunkConfig>(
	`${sliceName}/delete-feedback`,
	async (id, { extra }) => {
		const { feedbackApi } = extra;
		await feedbackApi.delete(id);

		return id;
	},
);

export {
	createFeedback,
	deleteFeedback,
	fetchAllFeedbacks,
	fetchFeedbackById,
	updateFeedback,
};
