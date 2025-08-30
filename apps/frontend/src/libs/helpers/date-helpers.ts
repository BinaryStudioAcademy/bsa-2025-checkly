import { ONE } from "../constants/constants.js";

const formatDateForInput = (dateString: null | string): string => {
	if (!dateString) {
		return "";
	}

	const [date] = new Date(dateString).toISOString().split("T");

	return date ?? "";
};

const addDays = (date: Date, days = ONE): Date => {
	const result = new Date(date);
	result.setDate(result.getDate() + days);

	return result;
};

export { addDays, formatDateForInput };
