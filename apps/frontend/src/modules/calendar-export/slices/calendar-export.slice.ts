import { createSlice } from "@reduxjs/toolkit";

import { exportCalendar } from "../slices.js";

type State = {
	isDownloading: boolean;
};

const initialState: State = {
	isDownloading: false,
};

const { actions, reducer } = createSlice({
	extraReducers: (builder) => {
		builder
			.addCase(exportCalendar.pending, (state) => {
				state.isDownloading = true;
			})
			.addCase(exportCalendar.rejected, (state) => {
				state.isDownloading = false;
			})
			.addCase(exportCalendar.fulfilled, (state) => {
				state.isDownloading = false;
			});
	},
	initialState,
	name: "calendarExport",
	reducers: {},
});

export { actions, reducer };
