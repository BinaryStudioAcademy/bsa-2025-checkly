const buildQueryString = (
	parameters: Record<string, boolean | number | string>,
): string => {
	const esc = encodeURIComponent;

	return Object.entries(parameters)
		.filter(([, value]) => Boolean(value))
		.map(([key, value]) => esc(key) + "=" + esc(value))
		.join("&");
};

export { buildQueryString };
