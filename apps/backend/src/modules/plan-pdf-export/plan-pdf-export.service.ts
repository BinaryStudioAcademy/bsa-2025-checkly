import puppeteer from "puppeteer";

import { ErrorConstants } from "~/libs/enums/enums.js";

import { type ExportPlanPdfDto } from "./libs/types/types.js";

class PlanPdfExportService {
	public async generatePdf(
		dto: ExportPlanPdfDto,
		token: string,
	): Promise<Buffer> {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		const printUrl = process.env["FRONTEND_PLAN_PRINT_URL"];

		if (typeof printUrl !== "string" || !printUrl) {
			throw new Error(ErrorConstants.DEFAULT_ERROR_MESSAGE);
		}

		await page.evaluateOnNewDocument((tk) => {
			globalThis.localStorage.setItem("token", tk);
		}, token);

		await page.goto(printUrl, { waitUntil: "networkidle0" });

		const pdfBuffer = await page.pdf({
			format: dto.format,
			printBackground: true,
		});

		await browser.close();

		return Buffer.from(pdfBuffer);
	}
}

export { PlanPdfExportService };
