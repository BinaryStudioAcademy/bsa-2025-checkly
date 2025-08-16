import { createSlice } from "@reduxjs/toolkit";

import { DataStatus, QuizIndexes } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	type QuizAnswer,
	type QuizCategoryValue,
	type QuizQuestionsResponseDto,
} from "~/modules/quiz/libs/types/types.js";
import { fetchQuestions } from "~/modules/quiz/slices/actions.js";

interface QuizState {
	answers: Record<number, QuizAnswer>;
	currentQuestion: number;
	dataStatus: ValueOf<typeof DataStatus>;
	notes: string;
	questions: null | QuizQuestionsResponseDto;
	selectedCategory: null | QuizCategoryValue;
}

const initialState: QuizState = {
	answers: {},
	currentQuestion: QuizIndexes.FIRST_INDEX,
	dataStatus: DataStatus.IDLE,
	notes: "",
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
			});
	},
	initialState,
	name: "quiz",
	reducers: {
		initializeFromStorage: (state, action: { payload: Partial<QuizState> }) => {
			const { answers, currentQuestion, notes, questions, selectedCategory } =
				action.payload;

			state.answers = answers ?? state.answers;
			state.currentQuestion = currentQuestion ?? state.currentQuestion;
			state.notes = notes ?? state.notes;
			state.questions = questions ?? state.questions;
			state.selectedCategory = selectedCategory ?? state.selectedCategory;
		},
		resetQuiz: (state) => {
			state.answers = {};
			state.currentQuestion = QuizIndexes.FIRST_INDEX;
			state.dataStatus = DataStatus.IDLE;
			state.notes = "";
			state.questions = null;
			state.selectedCategory = null;
		},
		saveAnswer: (state, action: { payload: QuizAnswer }) => {
			const answer = action.payload;
			state.answers[answer.questionId] = answer;
		},
		setCategory: (state, action: { payload: QuizCategoryValue }) => {
			state.selectedCategory = action.payload;
		},
		setCurrentQuestion: (state, action: { payload: number }) => {
			state.currentQuestion = action.payload;
		},
		setNotes: (state, action: { payload: string }) => {
			state.notes = action.payload;
		},
	},
});

export { actions, name, type QuizState, reducer };
