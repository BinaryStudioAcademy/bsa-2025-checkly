import { DataStatus, QuizIndexes } from "~/libs/enums/enums.js";
import { type QuizState } from "~/modules/quiz/slices/quiz.slice.js";

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

const LOADING_MESSAGES = [
	{ max: 30, min: 0, text: "Checking out your answers..." },
	{ max: 50, min: 30, text: "Figuring out what will work best..." },
	{ max: 91, min: 50, text: "Getting your plan ready..." },
	{ max: 100, min: 91, text: "Almost done!" },
] as const;

export {
	DEFAULT_QUIZ_STATE,
	FastTiming,
	LOADING_DURATION_MS,
	LOADING_MESSAGES,
	ProgressLimits,
	SlowTiming,
};
