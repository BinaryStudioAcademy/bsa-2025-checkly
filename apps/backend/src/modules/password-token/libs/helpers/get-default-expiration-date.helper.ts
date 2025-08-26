const getDefaultExpirationDate = (): Date => {
	const newDate = new Date();
	const hours = 1;

	return new Date(newDate.setUTCHours(newDate.getUTCHours() + hours));
};

export { getDefaultExpirationDate };
