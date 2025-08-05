import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type EnumValue, type QuizCategory } from "../libs/enums/enums.js";
import { type QuizAnswer, type QuizQuestionsResponseDto } from "../libs/types/types.js";
import { fetchQuestions, submitQuiz } from "./actions.js";

interface QuizState {
	answers: Record<number, QuizAnswer>;
	currentQuestion: number;
	dataStatus: ValueOf<typeof DataStatus>;
	questions: null| QuizQuestionsResponseDto;
	selectedCategory: EnumValue<typeof QuizCategory> | null;
}

const initialState: QuizState = {
	answers: {},
	currentQuestion: 1,
	dataStatus: DataStatus.IDLE,
	questions: null,
	selectedCategory: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers: (builder) => {
		builder
			.addCase(fetchQuestions.pending, (state) => {
				state.dataStatus = DataStatus.PENDING;
			})
			.addCase(fetchQuestions.fulfilled, (state, action) => {
				state.dataStatus = DataStatus.FULFILLED;
				state.questions = action.payload;
			})
			.addCase(fetchQuestions.rejected, (state) => {
				state.dataStatus = DataStatus.REJECTED;
			})
			.addCase(submitQuiz.pending, (state) => {
				state.dataStatus = DataStatus.PENDING;
			})
			.addCase(submitQuiz.fulfilled, (state) => {
				state.dataStatus = DataStatus.FULFILLED;
			})
			.addCase(submitQuiz.rejected, (state) => {
				state.dataStatus = DataStatus.REJECTED;
			});
	},
	initialState,
	name: "quiz",
	reducers: {
		resetQuiz: (state) => {
			state.answers = {};
			state.currentQuestion = 1;
			state.dataStatus = DataStatus.IDLE;
			state.questions = null;
			state.selectedCategory = null;
		},
		saveAnswer: (state, action: { payload: { answer: Array<number | string>; isSkipped?: boolean; questionId: number } }) => {
			const { answer, isSkipped = false, questionId } = action.payload;
			state.answers[questionId] = {
				answer,
				isSkipped,
				questionId,
			};
		},
		setCategory: (state, action: { payload: EnumValue<typeof QuizCategory> }) => {
			state.selectedCategory = action.payload;
		},
		setCurrentQuestion: (state, action: { payload: number }) => {
			state.currentQuestion = action.payload;
		},
	},
});

export { actions, name, reducer }; 