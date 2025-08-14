import {
	type QuizAnswersRequestDto,
	type QuizCategoryType,
} from "../types/types.js";

const DEFAULT_CATEGORY: QuizCategoryType = "hobby";
const DEFAULT_QUIZ_ANSWERS_PAYLOAD: QuizAnswersRequestDto = {
	answers: [],
	category: DEFAULT_CATEGORY,
	notes: "",
};

const SlowTiming = {
	INCREMENT_DIVISOR: 20,
	INCREMENT_MAX: 0.2,
	INTERVAL_MS: 100,
} as const;

const FastTiming = {
	INCREMENT: 1.5,
	INTERVAL_MS: 150,
} as const;

const ProgressLimits = {
	MAX: 100,
	MAX_SLOW: 90,
	MIN: 1,
} as const;

export { DEFAULT_QUIZ_ANSWERS_PAYLOAD, FastTiming, ProgressLimits, SlowTiming };
