import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type QuizAnswersRequestDto,
	type QuizQuestionsResponseDto,
} from "~/modules/quiz/libs/types/types.js";
import { name as sliceName } from "~/modules/quiz/slices/quiz.slice.js";

const fetchQuestions = createAsyncThunk<
	QuizQuestionsResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/fetch-questions`, async (_, { extra }) => {
	const { quizApi } = extra;

	return await quizApi.getQuestions();
});

const submitQuiz = createAsyncThunk<
	{ success: boolean },
	QuizAnswersRequestDto,
	AsyncThunkConfig
>(`${sliceName}/submit-quiz`, async (submission, { extra }) => {
	const { quizApi } = extra;

	const result = await quizApi.submitQuiz(submission);

	return { success: result };
});

export { fetchQuestions, submitQuiz };
