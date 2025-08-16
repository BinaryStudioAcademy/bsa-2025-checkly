import { ONE } from "../constants/constants.js";
import { WEEKDAYS } from "../constants/weekdays.js";

const getWeekday = (startDate: string, dayNumber: number): string => {
	const date = new Date(startDate);
	date.setUTCDate(date.getUTCDate() + dayNumber - ONE);

	return WEEKDAYS[date.getDay()] as string;
};

export { getWeekday };
