import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import {
	buildExportFilename,
	createCalendarIcs,
	transformPlanToExportData,
} from "~/modules/plan-calendar-export/libs/helpers/helpers.js";
import { type PlanService } from "~/modules/plans/plan.service.js";

import { type PlanCalendarExportRequestDto } from "./libs/types/types.js";

class PlanCalendarExportService {
	private planService: PlanService;

	public constructor(planService: PlanService) {
		this.planService = planService;
	}

	public async generateCalendar(
		dto: PlanCalendarExportRequestDto,
	): Promise<{ filename: string; ics: string }> {
		const planId = Number(dto.planId);
		const date = dto.startDate;

		const planEntity = await this.planService.findWithRelations(planId);

		if (!planEntity) {
			throw new HTTPError({
				message: "Plan not found",
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { exportData, planTitle } = transformPlanToExportData(
			planEntity,
			date,
		);

		const ics = createCalendarIcs(exportData, planId, planTitle);
		const filename = buildExportFilename(date, exportData);

		return { filename, ics };
	}
}

export { PlanCalendarExportService };
