import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type QuizQuestionsResponseDto, type QuizSubmission } from "../libs/types/types.js";
import { name as sliceName } from "./quiz.slice.js";

const fetchQuestions = createAsyncThunk<
	QuizQuestionsResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/fetch-questions`, async (_, { extra }) => {
	const { quizApi } = extra;

	return await quizApi.getQuestions();
});

const submitQuiz = createAsyncThunk<
	null,
	QuizSubmission,
	AsyncThunkConfig
>(`${sliceName}/submit-quiz`, async (submission, { extra }) => {
	const { quizApi } = extra;

	await quizApi.submitQuiz(submission);

	return null;
});

export { fetchQuestions, submitQuiz }; 