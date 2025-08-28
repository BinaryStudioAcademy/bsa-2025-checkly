import { createAsyncThunk } from "@reduxjs/toolkit";
import JSZip from "jszip";

import {
	type CategoryId,
	DEFAULT_HEIGHT,
	DEFAULT_PIXEL_RATIO,
	DEFAULT_WIDTH,
	FIRST_PAGE,
	getCategoryStyle,
	MAX_DAYS_PER_PAGE,
	MESSAGES,
	MIN_PAGES,
} from "~/libs/constants/constants.js";
import {
	FileExtension,
	PaperFormat,
	PlanCategoryId,
} from "~/libs/enums/enums.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";
import { type AsyncThunkConfig } from "~/libs/types/async-thunk-config.type.js";
import { type WindowSize } from "~/libs/types/types.js";
import { PLAN_STYLE_TO_READABLE } from "~/modules/plan-styles/libs/constants/plan-style.constants.js";
import {
	downloadFile,
	getBackendEndpoint,
} from "~/pages/plan-style-overview/lib/utils/utility.js";

import { name as sliceName } from "./pdf-export.slice.js";

const getPageCount = (totalDays: number): number =>
	Math.max(MIN_PAGES, Math.ceil(totalDays / MAX_DAYS_PER_PAGE));

const getWindowSize = (): WindowSize => {
	const w = (globalThis as { window?: Window }).window;
	const screen = w?.screen;

	const height = screen?.height ?? DEFAULT_HEIGHT;
	const width = screen?.width ?? DEFAULT_WIDTH;
	const pixelRatio = w?.devicePixelRatio ?? DEFAULT_PIXEL_RATIO;

	return { height, pixelRatio, width };
};

const downloadPngZip = async (
	baseName: string,
	pageCount: number,
	fetchPageBlob: (page: number) => Promise<Blob>,
): Promise<string> => {
	const zip = new JSZip();

	for (let page = FIRST_PAGE; page <= pageCount; page++) {
		const partName = `${baseName}-part-${String(page)}.${FileExtension.PNG}`;
		const blob = await fetchPageBlob(page);
		zip.file(partName, blob);
	}

	const zipBlob = await zip.generateAsync({ type: "blob" });
	const zipName = `${baseName}.zip`;
	downloadFile(zipBlob, zipName);

	return zipName;
};

type ExportPdfThunkArguments = {
	category: CategoryId;
};

const exportPdf = createAsyncThunk<
	{ fileName: string },
	ExportPdfThunkArguments,
	AsyncThunkConfig
>(`${sliceName}/export`, async ({ category }, { extra, getState }) => {
	const { pdfExportApi } = extra;

	const backendEndpoint = getBackendEndpoint(category);
	const view = getCategoryStyle(category);
	const format = PaperFormat.A4;

	const currentPlan = getState().plan.plan;

	if (!currentPlan?.id) {
		notifications.error(MESSAGES.DOWNLOAD.NO_PLAN_FOUND);

		return { fileName: "" };
	}

	const planTitle = String(currentPlan.title);
	const planStyleId = currentPlan.styleId;
	const { selectedStyle } = getState().plan;
	const styleToSend = planStyleId
		? (PLAN_STYLE_TO_READABLE[Number(planStyleId)] ?? String(selectedStyle))
		: String(selectedStyle);
	const fileName = `${planTitle}.${FileExtension.PDF}`;

	const blob = await pdfExportApi.exportPlan(backendEndpoint, {
		format,
		html: view,
		planId: currentPlan.id,
		planStyle: styleToSend,
		title: planTitle,
	});

	downloadFile(blob, fileName);

	return { fileName };
});

const exportDesktopPng = createAsyncThunk<
	{ fileName: string },
	undefined,
	AsyncThunkConfig
>(`${sliceName}/export-desktop-png`, async (_unused, { extra, getState }) => {
	const { pdfExportApi } = extra;

	const category = PlanCategoryId.DESKTOP;
	const backendEndpoint = getBackendEndpoint(category);
	const view = getCategoryStyle(category);
	const size: WindowSize = getWindowSize();

	const currentPlan = getState().plan.plan;

	if (!currentPlan?.id) {
		notifications.error(MESSAGES.DOWNLOAD.NO_PLAN_FOUND);

		return { fileName: "" };
	}

	const planTitle = String(currentPlan.title);
	const pageCount = getPageCount(currentPlan.days.length);
	const planStyleId = currentPlan.styleId;
	const { selectedStyle } = getState().plan;
	const styleToSend = planStyleId
		? (PLAN_STYLE_TO_READABLE[Number(planStyleId)] ?? String(selectedStyle))
		: String(selectedStyle);

	if (pageCount > MIN_PAGES) {
		const zipName = await downloadPngZip(planTitle, pageCount, (page) =>
			pdfExportApi.exportPlan(backendEndpoint, {
				format: PaperFormat.A4,
				html: view,
				page,
				planId: currentPlan.id,
				planStyle: styleToSend,
				title: planTitle,
				windowSize: size,
			}),
		);

		return { fileName: zipName };
	}

	const fileName = `${planTitle}.${FileExtension.PNG}`;
	const blob = await pdfExportApi.exportPlan(backendEndpoint, {
		format: PaperFormat.A4,
		html: view,
		planId: currentPlan.id,
		planStyle: styleToSend,
		title: planTitle,
		windowSize: size,
	});

	downloadFile(blob, fileName);

	return { fileName };
});
const exportMobilePng = createAsyncThunk<
	{ fileName: string },
	undefined,
	AsyncThunkConfig
>(`${sliceName}/export-mobile-png`, async (_unused, { extra, getState }) => {
	const { pdfExportApi } = extra;

	const category = PlanCategoryId.MOBILE;
	const backendEndpoint = getBackendEndpoint(category);
	const view = getCategoryStyle(category);
	const size: WindowSize = getWindowSize();

	const currentPlan = getState().plan.plan;

	if (!currentPlan?.id) {
		notifications.error(MESSAGES.DOWNLOAD.NO_PLAN_FOUND);

		return { fileName: "" };
	}

	const totalDays = currentPlan.days.length;
	const pageCount = getPageCount(totalDays);
	const planTitle = String(getState().plan.plan?.title);
	const planStyleId = getState().plan.plan?.styleId;
	const { selectedStyle } = getState().plan;
	const styleToSend = planStyleId
		? (PLAN_STYLE_TO_READABLE[Number(planStyleId)] ?? String(selectedStyle))
		: String(selectedStyle);

	if (pageCount > MIN_PAGES) {
		const zipName = await downloadPngZip(planTitle, pageCount, (page) =>
			pdfExportApi.exportPlan(backendEndpoint, {
				format: PaperFormat.A4,
				html: view,
				page,
				planId: currentPlan.id,
				planStyle: styleToSend,
				title: planTitle,
				windowSize: size,
			}),
		);

		notifications.success(MESSAGES.DOWNLOAD.SUCCESS);

		return { fileName: zipName };
	}

	const fileName = `${planTitle}.${FileExtension.PNG}`;
	const blob = await pdfExportApi.exportPlan(backendEndpoint, {
		format: PaperFormat.A4,
		html: view,
		planId: currentPlan.id,
		planStyle: styleToSend,
		title: planTitle,
		windowSize: size,
	});

	downloadFile(blob, fileName);
	notifications.success(MESSAGES.DOWNLOAD.SUCCESS);

	return { fileName };
});

export { exportDesktopPng, exportMobilePng, exportPdf };
