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
	planStyle?: string;
};

const exportPdf = createAsyncThunk<
	{ fileName: string },
	ExportPdfThunkArguments,
	AsyncThunkConfig
>(
	`${sliceName}/export`,
	async ({ category, planStyle }, { extra, getState }) => {
		const { pdfExportApi } = extra;

		const backendEndpoint = getBackendEndpoint(category);

		const printUrl = planStyle
			? `${AppRoute.PLAN_STYLE_PRINT}?style=${encodeURIComponent(planStyle)}`
			: AppRoute.PLAN_STYLE_PRINT;

		const responsePage = await fetch(printUrl);

		if (!responsePage.ok) {
			notifications.error(MESSAGES.DOWNLOAD.NO_PLAN_FOUND);

			return { fileName: "" };
		}

		const format = PaperFormat.A4;
		const html = await responsePage.text();

		const currentPlan = getState().plan.plan;
		const planTitle = currentPlan?.title || PLAN_NAME_DEFAULT;
		const fileName = `${planTitle}.${FileExtension.PDF}`;

		const blob = await pdfExportApi.exportPlan(backendEndpoint, {
			format,
			html,
			planStyle,
		});

		downloadFile(blob, fileName);

		return { fileName };
	},
);

export { exportPdf };
