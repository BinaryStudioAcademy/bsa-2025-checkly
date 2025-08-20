import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { PdfExportApi } from "./pdf-export-api.js";

const pdfExportApi = new PdfExportApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { pdfExportApi };
