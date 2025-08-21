import { createSlice } from "@reduxjs/toolkit";

import { PLAN_NAME_DEFAULT } from "~/libs/constants/constants.js";
import { DataStatus, FileExtension } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { exportPdf } from "./actions.js";

type PdfExportState = {
	dataStatus: ValueOf<typeof DataStatus>;
	fileName: string;
};

const initialState: PdfExportState = {
	dataStatus: DataStatus.IDLE,
	fileName: `${PLAN_NAME_DEFAULT}.${FileExtension.PDF}`,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(exportPdf.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(exportPdf.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.fileName = action.payload.fileName;
		});
		builder.addCase(exportPdf.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.fileName = `${PLAN_NAME_DEFAULT}.${FileExtension.PDF}`;
		});
	},
	initialState,
	name: "pdfExport",
	reducers: {},
});

export { actions, name, reducer };
