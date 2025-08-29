import { type HTTPCode } from "~/libs/modules/http/http.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type ExportIcsHeaders } from "./export-ics-headers.type.js";

type ExportIcsResponse = {
	headers: ExportIcsHeaders;
	payload: string;
	status: ValueOf<typeof HTTPCode>;
};

export { type ExportIcsResponse };
