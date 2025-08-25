import puppeteer from "puppeteer";

import { ErrorConstants } from "~/libs/enums/enums.js";
import { config } from "~/libs/modules/config/config.js";

import { NETWORK_IDLE_0 } from "./libs/constants/constants.js";
import { type ExportPlanPdfDto } from "./libs/types/types.js";

class PlanPdfExportService {
	public async generatePdf(dto: ExportPlanPdfDto): Promise<Buffer> {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		const printUrl = config.ENV.FRONTEND.PLAN_PRINT_URL;

		if (!printUrl) {
			throw new Error(ErrorConstants.DEFAULT_ERROR_MESSAGE);
		}

		const urlWithStyle = dto.planStyle
			? `${printUrl}?style=${encodeURIComponent(dto.planStyle)}`
			: printUrl;

		await page.goto(urlWithStyle, { waitUntil: NETWORK_IDLE_0 });

		const pdfBuffer = await page.pdf({
			format: dto.format,
			printBackground: true,
		});

		await browser.close();

		return Buffer.from(pdfBuffer);
	}
}

export { PlanPdfExportService };
