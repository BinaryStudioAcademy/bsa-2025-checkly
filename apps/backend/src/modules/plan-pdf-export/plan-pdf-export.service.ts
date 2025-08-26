import puppeteer from "puppeteer";

import { ErrorConstants } from "~/libs/enums/enums.js";
import { config } from "~/libs/modules/config/config.js";

import { NETWORK_IDLE_0 } from "./libs/constants/constants.js";
import {
	type ExportPlanPdfDto,
	ViewOption,
	type ViewOptions,
} from "./libs/types/types.js";

const DEFAULT_IMAGE = {
	HEIGHT: 1080,
	SCALE: 1,
	WIDTH: 1920,
} as const;

class PlanPdfExportService {
	public async generatePdf(dto: ExportPlanPdfDto): Promise<Buffer> {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		const printUrl = config.ENV.FRONTEND.PLAN_PRINT_URL;

		if (!printUrl) {
			await browser.close();

			throw new Error(ErrorConstants.DEFAULT_ERROR_MESSAGE);
		}

		const requested = dto.html.trim();
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

		await page.goto(url.toString(), { waitUntil: NETWORK_IDLE_0 });

		const pdfBuffer = await page.pdf({
			format: dto.format,
			printBackground: true,
		});

		await browser.close();

		return Buffer.from(pdfBuffer);
	}

	public async generatePng(dto: ExportPlanPdfDto): Promise<Buffer> {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		const printUrl = config.ENV.FRONTEND.PLAN_PRINT_URL;

		if (!printUrl) {
			await browser.close();

			throw new Error(ErrorConstants.DEFAULT_ERROR_MESSAGE);
		}

		const requested = dto.html.trim();
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

		const width = dto.windowSize?.width ?? DEFAULT_IMAGE.WIDTH;
		const height = dto.windowSize?.height ?? DEFAULT_IMAGE.HEIGHT;
		const deviceScaleFactor = dto.windowSize?.pixelRatio ?? DEFAULT_IMAGE.SCALE;
		await page.setViewport({
			deviceScaleFactor,
			height,
			width,
		});

		await page.goto(url.toString(), { waitUntil: NETWORK_IDLE_0 });

		const pngBuffer = await page.screenshot({ fullPage: true, type: "png" });

		await browser.close();

		return Buffer.from(pngBuffer as Buffer);
	}
}

export { PlanPdfExportService };
