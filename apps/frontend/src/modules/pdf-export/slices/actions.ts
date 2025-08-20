import { createAsyncThunk } from "@reduxjs/toolkit";

import { MESSAGES } from "~/libs/constants/constants.js";
import { AppRoute, FileExtension, PaperFormat } from "~/libs/enums/enums.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";
import { type AsyncThunkConfig } from "~/libs/types/async-thunk-config.type.js";
import { PlanName } from "~/pages/plan-style-overview/lib/enums/enums.js";
import { getBackendEndpoint } from "~/pages/plan-style-overview/lib/utils/get-backend-endpoint.utility.js";

import { name as sliceName } from "./pdf-export.slice.js";

type ExportPdfThunkArguments = {
	category: string;
};

const exportPdf = createAsyncThunk<
	{ blob: Blob; fileName: string },
	ExportPdfThunkArguments,
	AsyncThunkConfig
>(`${sliceName}/export`, async ({ category }, { extra }) => {
	const { pdfExportApi } = extra;

	const backendEndpoint = getBackendEndpoint(category);

	const responsePage = await fetch(AppRoute.PLAN_STYLE_PRINT);

	if (!responsePage.ok) {
		notifications.error(MESSAGES.DOWNLOAD.NO_PLAN_FOUND);
	}

	const format = PaperFormat.A4;
	const html = await responsePage.text();

	const fileName = `${PlanName.PLAN_1}.${FileExtension.PDF}`;
	const blob = await pdfExportApi.exportPlan(backendEndpoint, {
		format,
		html,
	});

	notifications.success(MESSAGES.DOWNLOAD.SUCCESS);

	return { blob, fileName };
});

export { exportPdf };
