import { MOCK_USERS, TOKEN } from "../constants/constants.js";

const generateTokens = async (payload: { userId: number; email: string }) =>
	TOKEN;

const findUserByEmail = (email: string) =>
	MOCK_USERS.find((u) => u.email === email);

export { generateTokens, findUserByEmail };
