import { DataStatus, QuizIndexes } from "~/libs/enums/enums.js";
import { type QuizState } from "~/modules/quiz-questions/slices/quiz-questions.slice.js";

const DEFAULT_QUIZ_STATE: QuizState = {
	answers: {},
	currentQuestion: QuizIndexes.FIRST_INDEX,
	dataStatus: DataStatus.IDLE,
	notes: "",
	questions: null,
	selectedCategory: null,
};

const SlowTiming = {
	INCREMENT_DIVISOR: 20,
	INCREMENT_MAX: 0.2,
	INTERVAL_MS: 100,
} as const;

const FastTiming = {
	INCREMENT: 1.5,
	INTERVAL_MS: 100,
} as const;

const ProgressLimits = {
	MAX: 100,
	MAX_SLOW: 90,
	MIN: 1,
} as const;

const LOADING_DURATION_MS = 6000;

export {
	DEFAULT_QUIZ_STATE,
	FastTiming,
	LOADING_DURATION_MS,
	ProgressLimits,
	SlowTiming,
};
