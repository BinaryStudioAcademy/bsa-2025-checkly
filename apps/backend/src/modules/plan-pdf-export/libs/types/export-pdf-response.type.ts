import { type HTTPCode } from "~/libs/modules/http/http.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type ExportPdfHeaders } from "./export-pdf-headers.type.js";

type ExportPdfResponse = {
	headers: ExportPdfHeaders;
	payload: Buffer;
	status: ValueOf<typeof HTTPCode>;
};

export { type ExportPdfResponse };
