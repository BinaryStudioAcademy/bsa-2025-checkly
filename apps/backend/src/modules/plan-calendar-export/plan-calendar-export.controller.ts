import { APIPath, ContentType } from "~/libs/enums/enums.js";
import {
	type APIBodyOptions,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPRequestMethod } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { planCalendarRequestSchema } from "~/modules/plan-calendar-export/libs/validation-schemas/validation-schemas.js";

import { PlanCalendarExportApiPath } from "./libs/enums/enums.js";
import {
	type ExportIcsResponse,
	type PlanCalendarExportRequestDto,
} from "./libs/types/types.js";
import { type PlanCalendarExportService } from "./plan-calendar-export.service.js";

class PlanCalendarExportController extends BaseController {
	private planCalendarExportService: PlanCalendarExportService;

	public constructor(
		logger: Logger,
		planCalendarExportService: PlanCalendarExportService,
	) {
		super(logger, APIPath.PLAN_EXPORT_ROOT);
		this.planCalendarExportService = planCalendarExportService;

		this.addRoute({
			handler: (options) =>
				this.exportCalendar(
					options as APIBodyOptions<PlanCalendarExportRequestDto>,
				),
			method: HTTPRequestMethod.POST,
			path: PlanCalendarExportApiPath.EXPORT_CALENDAR,
			validation: {
				body: planCalendarRequestSchema,
			},
		});
	}

	private async exportCalendar(
		options: APIBodyOptions<PlanCalendarExportRequestDto>,
	): Promise<ExportIcsResponse> {
		const { filename, ics } =
			await this.planCalendarExportService.generateCalendar(options.body);

		return {
			headers: {
				"Content-Disposition": `attachment; filename="${filename}"`,
				"Content-Type": ContentType.ICS,
			},
			payload: ics,
			status: HTTPCode.OK,
		};
	}
}

export { PlanCalendarExportController };
