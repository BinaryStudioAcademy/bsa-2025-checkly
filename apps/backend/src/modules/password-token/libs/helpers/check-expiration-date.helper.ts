import { ZERO } from "~/libs/constants/constants.js";

const checkExpirationDate = (expirationDate: Date): boolean => {
	const now = new Date();

	return expirationDate.getTime() - now.getTime() <= ZERO;
};

export { checkExpirationDate };
