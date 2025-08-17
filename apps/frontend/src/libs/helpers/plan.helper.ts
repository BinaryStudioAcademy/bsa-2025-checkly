import { ONE, TWO } from "~/libs/constants/numbers.js";
import { type DayTopic } from "~/libs/types/types.js";

const parseDayTopic = (topic: string): DayTopic => {
	const TOPIC_WITH_WEEKDAY_REGEX = /^(.+?) \((.+?)\)$/;
	const match = TOPIC_WITH_WEEKDAY_REGEX.exec(topic);

	if (match && match[ONE] && match[TWO]) {
		return {
			main: match[ONE],
			weekday: `(${match[TWO]})`,
		};
	}

	return { main: topic, weekday: "" };
};

export { parseDayTopic };