import { createAsyncThunk } from "@reduxjs/toolkit";

import {
	type CategoryId,
	getCategoryStyle,
	MESSAGES,
} from "~/libs/constants/constants.js";
import {
	FileExtension,
	PaperFormat,
	PlanCategoryId,
} from "~/libs/enums/enums.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";
import { type AsyncThunkConfig } from "~/libs/types/async-thunk-config.type.js";
import { PlanName } from "~/pages/plan-style-overview/lib/enums/enums.js";
import {
	downloadFile,
	getBackendEndpoint,
} from "~/pages/plan-style-overview/lib/utils/utility.js";

import { name as sliceName } from "./pdf-export.slice.js";

type ExportPdfThunkArguments = {
	category: CategoryId;
};

const exportPdf = createAsyncThunk<
	{ fileName: string },
	ExportPdfThunkArguments,
	AsyncThunkConfig
>(`${sliceName}/export`, async ({ category }, { extra }) => {
	const { pdfExportApi } = extra;

	const backendEndpoint = getBackendEndpoint(category);

	const view = getCategoryStyle(category);

	const format = PaperFormat.A4;

	const fileName = `${PlanName.PLAN_1}.${FileExtension.PDF}`;
	const blob = await pdfExportApi.exportPlan(backendEndpoint, {
		format,
		html: view,
	});

	downloadFile(blob, fileName);

	notifications.success(MESSAGES.DOWNLOAD.SUCCESS);

	return { fileName };
});

const exportDesktopPng = createAsyncThunk<
	{ fileName: string },
	undefined,
	AsyncThunkConfig
>(`${sliceName}/export-desktop-png`, async (_unused, { extra }) => {
	const { pdfExportApi } = extra;

	const category = PlanCategoryId.DESKTOP;
	const backendEndpoint = getBackendEndpoint(category);
	const view = getCategoryStyle(category);
	const format = PaperFormat.A4;

	const fileName = `${PlanName.PLAN_1}.${FileExtension.PNG}`;
	const blob = await pdfExportApi.exportPlan(backendEndpoint, {
		format,
		height: 1080,
		html: view,
		width: 1920,
	});

	downloadFile(blob, fileName);
	notifications.success(MESSAGES.DOWNLOAD.SUCCESS);

	return { fileName };
});

const exportMobilePng = createAsyncThunk<
	{ fileName: string },
	undefined,
	AsyncThunkConfig
>(`${sliceName}/export-mobile-png`, async (_unused, { extra }) => {
	const { pdfExportApi } = extra;

	const category = PlanCategoryId.MOBILE;
	const backendEndpoint = getBackendEndpoint(category);
	const view = getCategoryStyle(category);
	const format = PaperFormat.A4;

	const fileName = `${PlanName.PLAN_1}.${FileExtension.PNG}`;
	const blob = await pdfExportApi.exportPlan(backendEndpoint, {
		format,
		height: 1080,
		html: view,
		width: 1920,
	});

	downloadFile(blob, fileName);
	notifications.success(MESSAGES.DOWNLOAD.SUCCESS);

	return { fileName };
});

export { exportDesktopPng, exportMobilePng, exportPdf };
