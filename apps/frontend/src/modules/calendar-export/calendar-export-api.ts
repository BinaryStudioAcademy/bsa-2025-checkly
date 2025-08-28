import { ONE } from "~/libs/constants/constants.js";
import { APIPath, ContentType, HTTPRequestMethod } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { PlanCalendarExportApiPath } from "./libs/enums/enums.js";
import { type PlanCalendarExportRequestDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class CalendarExportApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.PLAN_EXPORT_ROOT, storage });
	}

	public async exportCalendar(
		payload: PlanCalendarExportRequestDto,
	): Promise<{ blob: Blob; fileName: null | string }> {
		const fullUrl = this.getFullEndpoint(
			PlanCalendarExportApiPath.EXPORT_CALENDAR,
			{},
		);
		const response = await this.load(fullUrl, {
			contentType: ContentType.JSON,
			hasAuth: true,
			method: HTTPRequestMethod.POST,
			payload: JSON.stringify(payload),
		});

		const contentDisposition = response.headers.get("Content-Disposition");
		const fileNameRegex = /filename="?([^";]+)"?/i;
		const fileNameMatch = contentDisposition
			? fileNameRegex.exec(contentDisposition)
			: null;
		const fileName = fileNameMatch?.[ONE] ?? null;

		return { blob: await response.blob(), fileName };
	}
}

export { CalendarExportApi };
