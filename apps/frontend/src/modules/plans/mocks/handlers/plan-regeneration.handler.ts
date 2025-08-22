import { http } from "~/libs/modules/api/mocks/http.js";
import { delay } from "msw";
import { HTTPCode } from "../libs/enums/enums.js";
import {
	ErrorMessage,
	MOCK_PLAN,
	MOCK_REGENERATED_PLAN_DAY,
} from "../libs/constants/constants.js";

const planRegenerationHandlers = [
	http.post("/plans/:id/regenerate", async ({ params }) => {
		console.log("asldfjlask");
		const { id } = params;

		if (!id) {
			return Response.json(
				{ error: ErrorMessage.MISSING_PARAMS },
				{ status: HTTPCode.BAD_REQUEST },
			);
		}

		await delay(2000);

		const updatedPlan = structuredClone(MOCK_PLAN);

		const regeneratedPlan = {
			...MOCK_REGENERATED_PLAN_DAY,
			title: "Regenerated plan",
		};

		Object.assign(updatedPlan, regeneratedPlan);

		return Response.json(updatedPlan, { status: HTTPCode.OK });
	}),
];

export { planRegenerationHandlers };
