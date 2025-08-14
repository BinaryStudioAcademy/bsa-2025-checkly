import { http } from "~/libs/modules/api/mocks/http.js";
import { delay } from "msw";
import { HTTPCode } from "../libs/enums/enums.js";
import {
	MAX_DELAY_MS,
	MIN_DELAY_MS,
	MOCK_PLAN,
} from "../libs/constants/constants.js";

export const planGenerationHandlers = [
	http.post("/plans/generate", async ({ request }) => {
		const { answers } = await request.json();

		// const planGeneration =
		// 	Math.floor(Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS)) + MIN_DELAY_MS;

		await delay(8000);

		return new Response(JSON.stringify(MOCK_PLAN), {
			status: HTTPCode.OK,
		});
	}),
];
