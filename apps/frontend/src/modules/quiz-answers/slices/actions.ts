import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type QuizAnswer } from "../libs/types/types.js";
import { name as sliceName } from "./quiz-answers.slice.js";

const saveAnswers = createAsyncThunk<number, QuizAnswer[], AsyncThunkConfig>(
	`${sliceName}/save-answers`,
	async (payload, { extra }) => {
		const { quizAnswerApi, quizApi } = extra;

		const quizId = await quizApi.create();

		await quizAnswerApi.create({ answers: payload, quizId });

		return quizId;
	},
);

export { saveAnswers };
