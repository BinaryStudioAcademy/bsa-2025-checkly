const now = new Date();
const ZERO = 0; //move to shared

const checkExpirationDate = (expirationDate: Date): boolean => {
	return expirationDate.getTime() - now.getTime() <= ZERO;
};

export { checkExpirationDate };
