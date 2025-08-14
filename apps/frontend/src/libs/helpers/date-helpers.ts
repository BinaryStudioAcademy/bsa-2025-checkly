const DATE_PART_INDEX = 0;

const formatDateForInput = (dateString: null | string): string => {
	if (!dateString) {
		return "";
	}

	return new Date(dateString).toISOString().split("T")[DATE_PART_INDEX] ?? "";
};

export { formatDateForInput };
