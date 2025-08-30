import { APIPath, ContentType, HTTPRequestMethod } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type PlanStyleDto } from "~/modules/plan-styles/libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class PlanStylesApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.PLAN_STYLES, storage });
	}

	public async getAll(): Promise<PlanStyleDto[]> {
		const response = await this.load(this.getFullEndpoint("/", {}), {
			contentType: ContentType.JSON,
			hasAuth: true,
			method: HTTPRequestMethod.GET,
		});

		const result = await response.json<PlanStyleDto[]>();

		return result;
	}
}

export { PlanStylesApi };
