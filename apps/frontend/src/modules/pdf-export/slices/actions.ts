import { createAsyncThunk } from "@reduxjs/toolkit";

import { MESSAGES } from "~/libs/constants/constants.js";
import { FileExtension, PaperFormat } from "~/libs/enums/enums.js";
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

		const currentPlan = getState().plan.plan;

		if (!currentPlan?.id) {
			notifications.error(MESSAGES.DOWNLOAD.NO_PLAN_FOUND);

			return { fileName: "" };
		}

		const fileName = `${currentPlan.title}.${FileExtension.PDF}`;

		const blob = await pdfExportApi.exportPlan(backendEndpoint, {
			format: PaperFormat.A4,
			planId: currentPlan.id,
			planStyle,
		});

		downloadFile(blob, fileName);

		return { fileName };
	},
);

export { exportPdf };
