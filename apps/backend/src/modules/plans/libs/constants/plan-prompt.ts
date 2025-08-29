import { type Style, type Time } from "../types/types.js";

const STYLE_QUESTION_TEXT = "What style of work fits you best?";
const TIME_QUESTION_TEXT =
	"How much time can you realistically dedicate per day?";
const DURATION_QUESTION_TEXT = "Choose your plan duration";

const STYLE_ANSWER_MIX = "👌 I like a bit of both";
const STYLE_ANSWER_BIG_CHALLENGES = "🏋️‍♂️ A few big challenges";
const STYLE_ANSWER_SMALL_STEPS = "🐾 Many small steps";

const TIME_ANSWER_10_15_MIN = "⏱ 10–15 min";
const TIME_ANSWER_20_30_MIN = "⏱ 20–30 min";
const TIME_ANSWER_45_60_MIN = "⏱ 45–60 min";
const TIME_ANSWER_1_2_HOURS = "⏱ 1–2 hours";
const TIME_ANSWER_MORE_THAN_2_HOURS = "⏱ More than 2 hours";

const DURATION_ANSWER_SUPRISE_ME = "🤷 Not sure yet — surprise me!";
const DURATION_ANSWER_5_DAYS = "5-day micro boost";
const DURATION_ANSWER_14_DAYS = "14-day reset";
const DURATION_ANSWER_21_DAYS = "21-day habit builder";

const DURATION_MAP: Record<string, number> = {
	[DURATION_ANSWER_5_DAYS]: 5,
	[DURATION_ANSWER_14_DAYS]: 14,
	[DURATION_ANSWER_21_DAYS]: 21,
	[DURATION_ANSWER_SUPRISE_ME]: 7,
};

const STYLE_ANSWER_MAP: Record<string, Style> = {
	[STYLE_ANSWER_BIG_CHALLENGES]: "Big Challenges",
	[STYLE_ANSWER_MIX]: "Mix",
	[STYLE_ANSWER_SMALL_STEPS]: "Small Steps",
};

const TIME_ANSWER_MAP: Record<string, Time> = {
	[TIME_ANSWER_1_2_HOURS]: "1-2h",
	[TIME_ANSWER_10_15_MIN]: "10-15min",
	[TIME_ANSWER_20_30_MIN]: "20-30min",
	[TIME_ANSWER_45_60_MIN]: "45-60min",
	[TIME_ANSWER_MORE_THAN_2_HOURS]: ">2h",
};

export {
	DURATION_ANSWER_SUPRISE_ME,
	DURATION_MAP,
	DURATION_QUESTION_TEXT,
	STYLE_ANSWER_MAP,
	STYLE_ANSWER_MIX,
	STYLE_QUESTION_TEXT,
	TIME_ANSWER_20_30_MIN,
	TIME_ANSWER_MAP,
	TIME_QUESTION_TEXT,
};
