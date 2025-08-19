import { http } from "~/libs/modules/api/mocks/http.js";
import { delay } from "msw";
import { HTTPCode } from "../libs/enums/enums.js";
import { MOCK_PLAN } from "../libs/constants/constants.js";

const planGetHandlers = [
	http.get("/plans/:userId", async ({ request, params }) => {
		const { userId } = params;

		await delay(200);

		if (userId) {
			return new Response(JSON.stringify(MOCK_PLAN), {
				status: HTTPCode.OK,
			});
		}

		return new Response(JSON.stringify(null), {
			status: HTTPCode.OK,
		});
	}),
];

export { planGetHandlers };
