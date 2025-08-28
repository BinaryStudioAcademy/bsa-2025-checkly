import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { CalendarExportApi } from "./calendar-export-api.js";

const calendarExportApi = new CalendarExportApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { calendarExportApi };
