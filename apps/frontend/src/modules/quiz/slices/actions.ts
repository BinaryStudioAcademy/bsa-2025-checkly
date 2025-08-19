import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type QuizQuestionsResponseDto } from "~/modules/quiz/libs/types/types.js";
import { name as sliceName } from "~/modules/quiz/slices/quiz.slice.js";

const fetchQuestions = createAsyncThunk<
	QuizQuestionsResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/fetch-questions`, async (_, { extra }) => {
	const { quizApi } = extra;

	return await quizApi.getQuestions();
});

export { fetchQuestions };
