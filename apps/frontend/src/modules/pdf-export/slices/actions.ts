import { createAsyncThunk } from "@reduxjs/toolkit";
import JSZip from "jszip";

import { PLAN } from "~/libs/components/plan-styles/mocks/plan-mocks.js";
import {
	type CategoryId,
	FIRST_PAGE,
	getCategoryStyle,
	MAX_DAYS_PER_PAGE,
	MESSAGES,
	MIN_PAGES,
	PLAN_NAME_DEFAULT,
} from "~/libs/constants/constants.js";
import {
	FileExtension,
	PaperFormat,
	PlanCategoryId,
} from "~/libs/enums/enums.js";
import { useWindowSize } from "~/libs/hooks/hooks.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";
import { type AsyncThunkConfig } from "~/libs/types/async-thunk-config.type.js";
import { type WindowSize } from "~/libs/types/types.js";
import {
	downloadFile,
	getBackendEndpoint,
} from "~/pages/plan-style-overview/lib/utils/utility.js";

import { name as sliceName } from "./pdf-export.slice.js";

const getPageCount = (totalDays: number): number =>
	Math.max(MIN_PAGES, Math.ceil(totalDays / MAX_DAYS_PER_PAGE));

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

	const planTitle = String(getState().plan.plan?.title ?? PLAN_NAME_DEFAULT);
	const { selectedStyle } = getState().plan;
	const fileName = `${planTitle}.${FileExtension.PDF}`;
	const blob = await pdfExportApi.exportPlan(backendEndpoint, {
		format,
		html: view,
		style: selectedStyle,
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
	const size: WindowSize = useWindowSize();

	const totalDays = PLAN.days.length;
	const pageCount = getPageCount(totalDays);
	const planTitle = String(getState().plan.plan?.title ?? PLAN_NAME_DEFAULT);
	const { selectedStyle } = getState().plan;

	if (pageCount > MIN_PAGES) {
		const zipName = await downloadPngZip(planTitle, pageCount, (page) =>
			pdfExportApi.exportPlan(backendEndpoint, {
				html: view,
				page,
				style: selectedStyle,
				windowSize: size,
			}),
		);

		return { fileName: zipName };
	}

	const fileName = `${planTitle}.${FileExtension.PNG}`;
	const blob = await pdfExportApi.exportPlan(backendEndpoint, {
		html: view,
		style: selectedStyle,
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
	const size: WindowSize = useWindowSize();

	const totalDays = PLAN.days.length;
	const pageCount = getPageCount(totalDays);
	const planTitle = String(getState().plan.plan?.title ?? PLAN_NAME_DEFAULT);
	const { selectedStyle } = getState().plan;

	if (pageCount > MIN_PAGES) {
		const zipName = await downloadPngZip(planTitle, pageCount, (page) =>
			pdfExportApi.exportPlan(backendEndpoint, {
				html: view,
				page,
				style: selectedStyle,
				windowSize: size,
			}),
		);

		notifications.success(MESSAGES.DOWNLOAD.SUCCESS);

		return { fileName: zipName };
	}

	const fileName = `${planTitle}.${FileExtension.PNG}`;
	const blob = await pdfExportApi.exportPlan(backendEndpoint, {
		html: view,
		style: selectedStyle,
		windowSize: size,
	});

	downloadFile(blob, fileName);
	notifications.success(MESSAGES.DOWNLOAD.SUCCESS);

	return { fileName };
});

export { exportDesktopPng, exportMobilePng, exportPdf };
