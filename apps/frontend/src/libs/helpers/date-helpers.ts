const formatDateForInput = (dateString: null | string): string => {
	if (!dateString) {
		return "";
	}

	const [date] = new Date(dateString).toISOString().split("T");

	return date ?? "";
};

export { formatDateForInput };
