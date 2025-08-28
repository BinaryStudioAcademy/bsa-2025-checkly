import puppeteer from "puppeteer";

import { config } from "~/libs/modules/config/config.js";

import {
	PLAN_PDF_EXPORT_ERRORS,
	PLAN_PDF_EXPORT_NETWORK_IDLES,
	PLAN_PDF_EXPORT_ROUTES,
	PLAN_PDF_EXPORT_SELECTORS,
	PLAN_PDF_EXPORT_TIMEOUTS,
} from "./libs/constants/constants.js";
import { type ExportPlanPdfDto } from "./libs/types/types.js";

class PlanPdfExportService {
	public async generatePdf(dto: ExportPlanPdfDto): Promise<Buffer> {
		const browser = await this.launchBrowser();
		const page = await browser.newPage();

		try {
			const printUrl = this.buildPrintUrl(dto);
			await this.navigateToPage(page, printUrl);
			await this.waitForPageLoad();
			await this.waitForContainer(page);
			await this.waitForApiCalls();

			const pdfBuffer = await this.generatePdfBuffer(page, dto);
			await this.cleanupBrowser(browser);

			return pdfBuffer;
		} catch {
			await this.cleanupBrowser(browser);

			throw new Error(PLAN_PDF_EXPORT_ERRORS.PDF_GENERATION);
		}
	}

	private buildPrintUrl(dto: ExportPlanPdfDto): string {
		const baseUrl =
			config.ENV.FRONTEND.PLAN_PRINT_URL || PLAN_PDF_EXPORT_ROUTES.ROOT;
		const hasPath = baseUrl.includes(PLAN_PDF_EXPORT_ROUTES.PLAN_STYLE_PRINT);
		const path = hasPath ? "" : PLAN_PDF_EXPORT_ROUTES.PLAN_STYLE_PRINT;

		return dto.planStyle
			? `${baseUrl}${path}?style=${encodeURIComponent(dto.planStyle)}&planId=${dto.planId?.toString() ?? ""}`
			: `${baseUrl}${path}?planId=${dto.planId?.toString() ?? ""}`;
	}

	private async cleanupBrowser(browser: puppeteer.Browser): Promise<void> {
		await browser.close();
	}

	private async generatePdfBuffer(
		page: puppeteer.Page,
		dto: ExportPlanPdfDto,
	): Promise<Buffer> {
		const pdfBuffer = await page.pdf({
			format: dto.format,
			preferCSSPageSize: true,
			printBackground: true,
		});

		return Buffer.from(pdfBuffer);
	}

	private async launchBrowser(): Promise<puppeteer.Browser> {
		return await puppeteer.launch();
	}

	private async navigateToPage(
		page: puppeteer.Page,
		printUrl: string,
	): Promise<void> {
		await page.goto(printUrl, {
			timeout: PLAN_PDF_EXPORT_TIMEOUTS.PDF_GENERATION,
			waitUntil: PLAN_PDF_EXPORT_NETWORK_IDLES.IDLE_0,
		});
	}

	private async tryAlternativeSelectors(page: puppeteer.Page): Promise<void> {
		const alternativeSelectors = PLAN_PDF_EXPORT_SELECTORS.ALTERNATIVE;

		for (const selector of alternativeSelectors) {
			try {
				await page.waitForSelector(selector, {
					timeout: PLAN_PDF_EXPORT_TIMEOUTS.SELECTOR,
				});

				return;
			} catch {
				continue;
			}
		}

		throw new Error(PLAN_PDF_EXPORT_ERRORS.CONTAINER_NOT_FOUND);
	}

	private async waitForApiCalls(): Promise<void> {
		await new Promise((resolve) =>
			setTimeout(resolve, PLAN_PDF_EXPORT_TIMEOUTS.API_CALL),
		);
	}

	private async waitForContainer(page: puppeteer.Page): Promise<void> {
		try {
			await page.waitForSelector(PLAN_PDF_EXPORT_SELECTORS.PRINT_CONTAINER, {
				timeout: PLAN_PDF_EXPORT_TIMEOUTS.SELECTOR,
			});
		} catch {
			await this.tryAlternativeSelectors(page);
		}
	}

	private async waitForPageLoad(): Promise<void> {
		await new Promise((resolve) =>
			setTimeout(resolve, PLAN_PDF_EXPORT_TIMEOUTS.PAGE_LOAD),
		);
	}
}

export { PlanPdfExportService };
