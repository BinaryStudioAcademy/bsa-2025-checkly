import { APIPath, ContentType, ErrorConstants } from "~/libs/enums/enums.js";
import {
	type APIBodyOptions,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPRequestMethod } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type ValueOf } from "~/libs/types/types.js";

import { PlanPdfExportApiPath } from "./libs/enums/enums.js";
import { type ExportPlanPdfDto } from "./libs/types/types.js";
import { planPdfExportValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
import { type PlanPdfExportService } from "./plan-pdf-export.service.js";
/**
 * @swagger
 * /plan-pdf-export/export-pdf:
 *   post:
 *     tags:
 *       - plan-pdf-export
 *     summary: Export plan as PDF
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExportPlanPdfDto'
 *           example:
 *             planId: 1
 *     responses:
 *       200:
 *         description: PDF exported successfully
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: An unexpected error occurred. Please try again later.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               errorType: "VALIDATION"
 *               message: "An unexpected error occurred. Please try again later."
 */
class PlanPdfExportController extends BaseController {
	private planPdfExportService: PlanPdfExportService;

	public constructor(
		logger: Logger,
		planPdfExportService: PlanPdfExportService,
	) {
		super(logger, APIPath.PLAN_EXPORT_ROOT);
		this.planPdfExportService = planPdfExportService;

		this.addRoute({
			handler: (options) =>
				this.exportPdf(options as APIBodyOptions<ExportPlanPdfDto>),
			method: HTTPRequestMethod.POST,
			path: PlanPdfExportApiPath.EXPORT_PDF,
			validation: {
				body: planPdfExportValidationSchema,
			},
		});
	}

	private async exportPdf(options: APIBodyOptions<ExportPlanPdfDto>): Promise<{
		headers: { [key: string]: string };
		payload: Buffer;
		status: ValueOf<typeof HTTPCode>;
	}> {
		const token = options.request?.headers["authorization"]?.replace(
			"Bearer ",
			"",
		);

		if (!token) {
			throw new Error(ErrorConstants.DEFAULT_ERROR_MESSAGE);
		}

		const pdfBuffer = await this.planPdfExportService.generatePdf(
			options.body,
			token,
		);

		return {
			headers: { "Content-Type": ContentType.PDF },
			payload: pdfBuffer,
			status: HTTPCode.OK as (typeof HTTPCode)[keyof typeof HTTPCode],
		};
	}
}

export { PlanPdfExportController };
