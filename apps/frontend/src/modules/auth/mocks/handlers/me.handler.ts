import { http } from "~/libs/modules/api/mocks/http.js";
import { HTTPCode } from "../libs/enums/enums.js";
import { DEFAULT_USER_INDEX, MOCK_USERS } from "../libs/constants/constants.js";

export const meHandlers = [
	http.get("/auth/me", async () => {
		return new Response(JSON.stringify({ ...MOCK_USERS[DEFAULT_USER_INDEX] }), {
			status: HTTPCode.OK,
		});
	}),
];
