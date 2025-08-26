import { http } from "~/libs/modules/api/mocks/http.js";
import { delay } from "msw";
import { HTTPCode } from "../libs/enums/enums.js";
import {
	ErrorMessage,
	MOCK_PLAN,
	MOCK_GENERATED_PLAN,
	MOCK_ANSWERS,
	MOCK_CATEGORY,
	MIN_DELAY_MS,
} from "../libs/constants/constants.js";

const planRegenerationHandlers = [
	http.put("/plans/:id/regenerate", async ({ params }) => {
		const { id } = params;

		if (!id) {
			return Response.json(
				{ error: ErrorMessage.MISSING_PARAMS },
				{ status: HTTPCode.BAD_REQUEST },
			);
		}

		await delay(MIN_DELAY_MS);

		const existingPlan = MOCK_PLAN.id?.toString() === id ? MOCK_PLAN : null;
		if (!existingPlan) {
			return Response.json(
				{ error: ErrorMessage.PLAN_NOT_FOUND },
				{ status: HTTPCode.NOT_FOUND },
			);
		}

		if (!MOCK_ANSWERS.length) {
			return Response.json(
				{ error: ErrorMessage.ANSWERS_NOT_FOUND },
				{ status: HTTPCode.NOT_FOUND },
			);
		}

		if (!MOCK_CATEGORY) {
			return Response.json(
				{ error: ErrorMessage.CATEGORY_NOT_FOUND },
				{ status: HTTPCode.NOT_FOUND },
			);
		}

		const generatedPlan = {
			...MOCK_GENERATED_PLAN,
			title: `${MOCK_CATEGORY.title} - Regenerated`,
		};

		const updatedPlan = {
			...existingPlan,
			...generatedPlan,
		};

		return Response.json(updatedPlan, { status: HTTPCode.OK });
	}),
];

export { planRegenerationHandlers };
