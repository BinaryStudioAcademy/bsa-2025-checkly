import { APIPath, ContentType, HTTPRequestMethod } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { type ExportPlanPdfDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class PdfExportApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.PLAN_EXPORT_ROOT, storage });
	}

	public async exportPlan(
		endpoint: string,
		payload: ExportPlanPdfDto,
	): Promise<Blob> {
		const fullUrl = this.getFullEndpoint(endpoint, {});
		const response = await this.load(fullUrl, {
			contentType: ContentType.JSON,
			hasAuth: true,
			method: HTTPRequestMethod.POST,
			payload: JSON.stringify(payload),
		});

		return await response.blob();
	}
}

export { PdfExportApi };
