import puppeteer from "puppeteer";

import { config } from "~/libs/modules/config/config.js";

import {
	DEFAULT_IMAGE,
	PLAN_PDF_EXPORT_ERRORS,
	PLAN_PDF_EXPORT_NETWORK_IDLES,
	PLAN_PDF_EXPORT_ROUTES,
	PLAN_PDF_EXPORT_SELECTORS,
	PLAN_PDF_EXPORT_TIMEOUTS,
} from "./libs/constants/constants.js";
import {
	type ExportPlanPdfDto,
	ViewOption,
	type ViewOptions,
} from "./libs/types/types.js";

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

	public async generatePng(dto: ExportPlanPdfDto): Promise<Buffer> {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		const printUrl = config.ENV.FRONTEND.PLAN_PRINT_URL;

		if (!printUrl) {
			await browser.close();

			throw new Error(PLAN_PDF_EXPORT_ERRORS.CONTAINER_NOT_FOUND);
		}

		const requested = dto.html?.trim() ?? "";
		const isViewOption = (value: string): value is ViewOptions =>
			Object.values(ViewOption).includes(value as ViewOptions);
		const view: ViewOptions = isViewOption(requested)
			? requested
			: ViewOption.REGULAR;

		const url = new URL(printUrl);
		url.searchParams.set("view", view);

		const style = dto.planStyle?.trim().toUpperCase();

		if (style) {
			url.searchParams.set("style", style);
		}

		if (dto.title) {
			url.searchParams.set("title", dto.title);
		}

		if (dto.page) {
			url.searchParams.set("page", String(dto.page));
		}

		if (dto.planId) {
			url.searchParams.set("planId", String(dto.planId));
		}

		const width = dto.windowSize?.width ?? DEFAULT_IMAGE.WIDTH;
		const height = dto.windowSize?.height ?? DEFAULT_IMAGE.HEIGHT;
		const deviceScaleFactor = dto.windowSize?.pixelRatio ?? DEFAULT_IMAGE.SCALE;
		await page.setViewport({
			deviceScaleFactor,
			height,
			width,
		});

		await page.goto(url.toString(), {
			waitUntil: PLAN_PDF_EXPORT_NETWORK_IDLES.IDLE_0,
		});

		const pngBuffer = await page.screenshot({ fullPage: true, type: "png" });

		await browser.close();

		return Buffer.from(pngBuffer as Buffer);
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
		return await puppeteer.launch({
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
			headless: true,
		});
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
