const storeToken = (token: string): void => {
	localStorage.setItem("token", token);
};

const getToken = (): null | string => {
	return localStorage.getItem("token");
};

const clearToken = (): void => {
	localStorage.removeItem("token");
};

export { clearToken, getToken, storeToken };
