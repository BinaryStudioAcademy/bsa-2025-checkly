import { http } from "~/libs/modules/api/mocks/http.js";

import {
	generateTokens,
	findUserByEmail,
} from "../libs/utilities/utilities.js";
import { makeErrorResponse } from "~/libs/modules/api/mocks/libs/utilities/utilities.js";
import { delay } from "msw";
import { HTTPCode, UserValidationMessage } from "../libs/enums/enums.js";
import { USER_PASSWORDS } from "../libs/constants/constants.js";

export const signInHandlers = [
	http.post("/auth/login", async ({ request }) => {
		const { email, password } = await request.json();

		const user = findUserByEmail(email);
		const storedPassword = USER_PASSWORDS.get(email);

		await delay();

		if (!user || storedPassword !== password) {
			return makeErrorResponse(
				UserValidationMessage.WRONG_PASSWORD,
				HTTPCode.UNAUTHORIZED,
			);
		}

		return new Response(
			JSON.stringify({
				token: await generateTokens({ userId: user.id, email: user.email }),
				user,
			}),
			{ status: HTTPCode.CREATED },
		);
	}),
];
