import { createAsyncThunk } from "@reduxjs/toolkit";
import { type PlanCalendarExportRequestDto } from "shared";

import { MESSAGES } from "~/libs/constants/constants.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { downloadFile } from "~/pages/plan-style-overview/lib/utils/download-file.utility.js";

const exportCalendar = createAsyncThunk<
	{ fileName: string },
	PlanCalendarExportRequestDto,
	AsyncThunkConfig
>("calendar-export/export", async (payload, { extra }) => {
	const { calendarExportApi } = extra;

	try {
		const { blob, fileName: headerFileName } =
			await calendarExportApi.exportCalendar(payload);
		const fileName = headerFileName ?? "plan.ics";
		downloadFile(blob, fileName);

		return { fileName };
	} catch {
		notifications.error(MESSAGES.DOWNLOAD.FAILED);

		return { fileName: "" };
	}
});

export { exportCalendar };
