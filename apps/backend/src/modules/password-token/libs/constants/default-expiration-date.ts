const newDate = new Date();
const hours = 1;

const DEFAULT_EXPIRATION_DATE = new Date(
	newDate.setUTCHours(newDate.getUTCHours() + hours),
);

export { DEFAULT_EXPIRATION_DATE };
