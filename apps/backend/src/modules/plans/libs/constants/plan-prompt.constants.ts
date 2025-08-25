import { type Style, type Time } from "../types/types.js";

const STYLE_QUESTION_TEXT = "What style of work fits you best?";
const TIME_QUESTION_TEXT =
	"How much time can you realistically dedicate per day?";

const STYLE_ANSWER_MIX = "👌 I like a bit of both";
const STYLE_ANSWER_BIG_CHALLENGES = "🏋️‍♂️ A few big challenges";
const STYLE_ANSWER_SMALL_STEPS = "🐾 Many small steps";

const TIME_ANSWER_10_15_MIN = "⏱ 10–15 min";
const TIME_ANSWER_20_30_MIN = "⏱ 20–30 min";
const TIME_ANSWER_45_60_MIN = "⏱ 45–60 min";
const TIME_ANSWER_1_2_HOURS = "⏱ 1–2 hours";
const TIME_ANSWER_MORE_THAN_2_HOURS = "⏱ More than 2 hours";

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
	STYLE_ANSWER_MAP,
	STYLE_ANSWER_MIX,
	STYLE_QUESTION_TEXT,
	TIME_ANSWER_20_30_MIN,
	TIME_ANSWER_MAP,
	TIME_QUESTION_TEXT,
};
