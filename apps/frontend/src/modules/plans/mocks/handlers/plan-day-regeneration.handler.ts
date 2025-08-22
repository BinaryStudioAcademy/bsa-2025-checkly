import { http } from "~/libs/modules/api/mocks/http.js";
import { delay } from "msw";
import { HTTPCode } from "../libs/enums/enums.js";
import {
	ErrorMessage,
	MOCK_PLAN,
	MOCK_REGENERATED_PLAN_DAY,
	NOT_FOUND_INDEX,
} from "../libs/constants/constants.js";

const updateDay = (
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
	http.post("/plans/:planId/days/:dayId/regenerate", async ({ params }) => {
		const { planId, dayId } = params;

		if (!planId || !dayId) {
			return Response.json(
				{ error: ErrorMessage.MISSING_PARAMS },
				{ status: HTTPCode.BAD_REQUEST },
			);
		}

		await delay(1000);

		const updatedPlan = structuredClone(MOCK_PLAN);

		const originalDay = updatedPlan.days?.find(
			(day) => String(day.id) === String(dayId),
		);

		if (!originalDay) {
			return Response.json(
				{ error: ErrorMessage.TASK_NOT_FOUND },
				{ status: HTTPCode.NOT_FOUND },
			);
		}

		const regeneratedDay = {
			...MOCK_REGENERATED_PLAN_DAY,
			id: dayId,
			dayNumber: originalDay.dayNumber!,
		};

		if (!updateDay(updatedPlan, dayId, regeneratedDay)) {
			return Response.json(
				{ error: ErrorMessage.TASK_NOT_FOUND },
				{ status: HTTPCode.NOT_FOUND },
			);
		}

		return Response.json(updatedPlan, { status: HTTPCode.OK });
	}),
];

export { planDayRegenerationHandlers };
