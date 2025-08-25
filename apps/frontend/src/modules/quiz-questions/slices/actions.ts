import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type QuizQuestionsResponseDto } from "~/modules/quiz-questions/libs/types/types.js";
import { name as sliceName } from "~/modules/quiz-questions/slices/quiz-questions.slice.js";

const fetchQuestions = createAsyncThunk<
	QuizQuestionsResponseDto,
	{ categoryId: number },
	AsyncThunkConfig
>(`${sliceName}/fetch-questions`, async ({ categoryId }, { extra }) => {
	const { quizQuestionApi } = extra;

	return await quizQuestionApi.getQuestionsByCategoryId(categoryId);
});

export { fetchQuestions };
