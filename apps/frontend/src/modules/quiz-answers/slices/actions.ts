import { createAsyncThunk } from "@reduxjs/toolkit";

import { storage, StorageKey } from "~/libs/modules/storage/storage.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type QuizAnswer } from "../libs/types/types.js";
import { name as sliceName } from "./quiz-answers.slice.js";

const saveAnswers = createAsyncThunk<
	number,
	{ answers: QuizAnswer[]; categoryId: number },
	AsyncThunkConfig
>(`${sliceName}/save-answers`, async (payload, { extra }) => {
	const { quizAnswerApi, quizApi } = extra;
	const { answers, categoryId } = payload;

	const quizId = await quizApi.create({ categoryId });
	await storage.set(StorageKey.QUIZ_ID, String(quizId));

	await quizAnswerApi.create({ answers, quizId });

	return quizId;
});

export { saveAnswers };
