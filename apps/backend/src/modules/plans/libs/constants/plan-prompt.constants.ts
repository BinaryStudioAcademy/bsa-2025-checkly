import { type Style, type Time } from "../types/types.js";

const STYLE_ANSWER_MAP: Record<string, Style> = {
	"🏋️‍♂️ A few big challenges": "Big Challenges",
	"🐾 Many small steps": "Small Steps",
	"👌 I like a bit of both": "Mix",
};

const TIME_ANSWER_MAP: Record<string, Time> = {
	"⏱ 1–2 hours": "1-2h",
	"⏱ 10–15 min": "10-15min",
	"⏱ 20–30 min": "20-30min",
	"⏱ 45–60 min": "45-60min",
	"⏱ More than 2 hours": ">2h",
};

export { STYLE_ANSWER_MAP, TIME_ANSWER_MAP };
