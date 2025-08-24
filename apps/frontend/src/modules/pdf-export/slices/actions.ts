import { createAsyncThunk } from "@reduxjs/toolkit";

import { MESSAGES, PLAN_NAME_DEFAULT } from "~/libs/constants/constants.js";
import { AppRoute, FileExtension, PaperFormat } from "~/libs/enums/enums.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";
import { type AsyncThunkConfig } from "~/libs/types/async-thunk-config.type.js";
import {
	downloadFile,
	getBackendEndpoint,
} from "~/pages/plan-style-overview/lib/utils/utility.js";

import { name as sliceName } from "./pdf-export.slice.js";

type ExportPdfThunkArguments = {
	category: string;
};

const exportPdf = createAsyncThunk<
	{ fileName: string },
	ExportPdfThunkArguments,
	AsyncThunkConfig
>(`${sliceName}/export`, async ({ category }, { extra, getState }) => {
	const { pdfExportApi } = extra;

	const backendEndpoint = getBackendEndpoint(category);

	const responsePage = await fetch(AppRoute.PLAN_STYLE_PRINT);

	if (!responsePage.ok) {
		notifications.error(MESSAGES.DOWNLOAD.NO_PLAN_FOUND);

		return { fileName: "" };
	}

	const format = PaperFormat.A4;
	const html = await responsePage.text();

	const planTitle = getState().plan.plan?.title || PLAN_NAME_DEFAULT;
	const fileName = `${planTitle}.${FileExtension.PDF}`;
	const blob = await pdfExportApi.exportPlan(backendEndpoint, {
		format,
		html,
	});

	downloadFile(blob, fileName);

	return { fileName };
});

export { exportPdf };
