import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { clearQuizState } from "../libs/storage/quiz-storage.js";
import {
	type QuizAnswer,
	type QuizCategoryValue,
	type QuizQuestionsResponseDto,
} from "../libs/types/types.js";
import { fetchQuestions, submitQuiz } from "./actions.js";

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
	currentQuestion: 1,
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
			})
			.addCase(submitQuiz.rejected, (state) => {
				state.dataStatus = DataStatus.REJECTED;
			});
	},
	initialState,
	name: "quiz",
	reducers: {
		initializeFromStorage: (state, action: { payload: Partial<QuizState> }) => {
			const { answers, currentQuestion, notes, selectedCategory } =
				action.payload;

			state.answers = answers || state.answers;
			state.currentQuestion = currentQuestion || state.currentQuestion;
			state.notes = notes ?? state.notes;
			state.selectedCategory = selectedCategory || state.selectedCategory;
		},
		resetQuiz: (state) => {
			state.answers = {};
			state.currentQuestion = 1;
			state.dataStatus = DataStatus.IDLE;
			state.notes = "";
			state.questions = null;
			state.selectedCategory = null;
			void clearQuizState();
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
