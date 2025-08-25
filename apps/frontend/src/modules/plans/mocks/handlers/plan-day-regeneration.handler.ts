import { http } from "~/libs/modules/api/mocks/http.js";
import { delay } from "msw";
import { HTTPCode } from "../libs/enums/enums.js";
import {
	ErrorMessage,
	MOCK_PLAN,
	MOCK_REGENERATED_PLAN_DAY,
	MOCK_ANSWERS,
	MOCK_CATEGORY,
	NOT_FOUND_INDEX,
} from "../libs/constants/constants.js";

const regenerateDayTasks = (
	plan: typeof MOCK_PLAN,
	dayId: string,
	regeneratedDay: typeof MOCK_REGENERATED_PLAN_DAY,
): boolean => {
	if (!plan.days) return false;

	const index = plan.days.findIndex((day) => String(day.id) === dayId);
	if (index === NOT_FOUND_INDEX) return false;

	plan.days[index] = regeneratedDay;

	return true;
};

const planDayRegenerationHandlers = [
	http.patch("/plans/:planId/days/:dayId/regenerate", async ({ params }) => {
		const { planId, dayId } = params;

		if (!planId || !dayId) {
			return Response.json(
				{ error: ErrorMessage.MISSING_PARAMS },
				{ status: HTTPCode.BAD_REQUEST },
			);
		}

		await delay(800);

		const existingPlan = MOCK_PLAN.id?.toString() === planId ? MOCK_PLAN : null;
		if (!existingPlan) {
			return Response.json(
				{ error: ErrorMessage.PLAN_NOT_FOUND },
				{ status: HTTPCode.NOT_FOUND },
			);
		}

		const existingDay = existingPlan.days?.find((d) => String(d.id) === dayId);
		if (!existingDay || Number(existingDay.planId) !== Number(planId)) {
			return Response.json(
				{ error: ErrorMessage.PLAN_DAY_NOT_FOUND },
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

		const regeneratedDay = {
			...MOCK_REGENERATED_PLAN_DAY,
			id: Number(dayId),
			dayNumber: existingDay.dayNumber,
		};

		const updatedPlan = structuredClone(MOCK_PLAN);
		const replaced = regenerateDayTasks(updatedPlan, dayId, regeneratedDay);

		if (!replaced) {
			return Response.json(
				{ error: ErrorMessage.PLAN_DAY_NOT_FOUND },
				{ status: HTTPCode.NOT_FOUND },
			);
		}

		return Response.json(updatedPlan, { status: HTTPCode.OK });
	}),
];

export { planDayRegenerationHandlers };
