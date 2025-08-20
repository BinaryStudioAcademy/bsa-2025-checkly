import { createSlice } from "@reduxjs/toolkit";

import { DataStatus, FileExtension } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { PlanName } from "~/pages/plan-style-overview/lib/enums/enums.js";

import { exportPdf } from "./actions.js";

interface PdfExportState {
	dataStatus: ValueOf<typeof DataStatus>;
	fileName: string;
	pdfBlob: Blob;
}

const initialState: PdfExportState = {
	dataStatus: DataStatus.IDLE,
	fileName: `${PlanName.PLAN_1}.${FileExtension.PDF}`,
	pdfBlob: new Blob(),
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(exportPdf.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(exportPdf.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.pdfBlob = action.payload.blob;
			state.fileName = action.payload.fileName;
		});
		builder.addCase(exportPdf.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.fileName = `${PlanName.PLAN_1}.${FileExtension.PDF}`;
			state.pdfBlob = new Blob();
		});
	},
	initialState,
	name: "pdfExport",
	reducers: {},
});

export { actions, name, reducer };
