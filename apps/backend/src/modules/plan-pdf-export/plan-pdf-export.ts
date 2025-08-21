import { logger } from "~/libs/modules/logger/logger.js";

import { PlanPdfExportController } from "./plan-pdf-export.controller.js";
import { PlanPdfExportService } from "./plan-pdf-export.service.js";

const planPdfExportService = new PlanPdfExportService();
const planPdfExportController = new PlanPdfExportController(
	logger,
	planPdfExportService,
);

export { planPdfExportController };
