import { http } from "~/libs/modules/api/mocks/http.js";
import {
	generateTokens,
	findUserByEmail,
} from "../libs/utilities/utilities.js";
import { ApiSchemas } from "~/libs/modules/api/schema/schema.js";
import { HTTPCode, UserValidationMessage } from "../libs/enums/enums.js";
import { delay } from "msw";
import { makeErrorResponse } from "~/libs/modules/api/mocks/libs/utilities/utilities.js";
import {
	INCREMENT,
	MOCK_USERS,
	USER_PASSWORDS,
} from "../libs/constants/constants.js";

export const signUpHandlers = [
	http.post("/auth/register", async ({ request }) => {
		const { email, name, password } = await request.json();

		await delay();

		if (findUserByEmail(email)) {
			return makeErrorResponse(
				UserValidationMessage.EMAIL_ALREADY_EXISTS,
				HTTPCode.BAD_REQUEST,
			);
		}

		const newUser: ApiSchemas["User"] = {
			id: MOCK_USERS.length + INCREMENT,
			email,
			name,
		};

		MOCK_USERS.push(newUser);
		USER_PASSWORDS.set(email, password);

		return new Response(
			JSON.stringify({
				token: await generateTokens({
					userId: newUser.id,
					email: newUser.email,
				}),
				user: newUser,
			}),
			{ status: HTTPCode.CREATED },
		);
	}),
];
