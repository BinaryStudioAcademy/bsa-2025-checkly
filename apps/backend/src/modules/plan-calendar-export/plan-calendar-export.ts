import { logger } from "~/libs/modules/logger/logger.js";
import { planService } from "~/modules/plans/plans.js";

import { PlanCalendarExportController } from "./plan-calendar-export.controller.js";
import { PlanCalendarExportService } from "./plan-calendar-export.service.js";

const planCalendarExportService = new PlanCalendarExportService(planService);
const planCalendarExportController = new PlanCalendarExportController(
	logger,
	planCalendarExportService,
);

export { planCalendarExportController };
