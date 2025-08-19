import { buildQueryString } from "shared/src/libs/helpers/helpers.js";

import { APIPath, ContentType, HTTPRequestMethod } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type PlanDaysTaskDto } from "~/modules/plans/plans.js";

import { PlansApiPath } from "./libs/enums/enums.js";
import {
	type PlanSearchQueryParameter,
	type PlanWithCategoryDto,
	type QuizAnswersRequestDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class PlanApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.PLANS, storage });
	}

	public async generate(
		payload: QuizAnswersRequestDto,
	): Promise<PlanDaysTaskDto> {
		const response = await this.load(
			this.getFullEndpoint(PlansApiPath.PLAN_GENERATE, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: HTTPRequestMethod.POST,
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<PlanDaysTaskDto>();
	}

	public async getAllUserPlans(): Promise<PlanDaysTaskDto[]> {
		const response = await this.load(
			this.getFullEndpoint(PlansApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: HTTPRequestMethod.GET,
			},
		);

		return await response.json<PlanDaysTaskDto[]>();
	}

	public async search({
		categoryId,
		title,
	}: PlanSearchQueryParameter): Promise<PlanWithCategoryDto[]> {
		const queryParameters: Record<string, string> = {};

		if (title) {
			queryParameters["title"] = title;
		}

		if (categoryId) {
			queryParameters["categoryId"] = categoryId.toString();
		}

		const endpoint = this.getFullEndpoint(PlansApiPath.SEARCH, {});
		const queryString = buildQueryString(queryParameters);
		const endpointWithQuery = queryString
			? `${endpoint}?${queryString}`
			: endpoint;

		const response = await this.load(endpointWithQuery, {
			contentType: ContentType.JSON,
			hasAuth: true,
			method: HTTPRequestMethod.GET,
		});

		return await response.json<PlanWithCategoryDto[]>();
	}
}

export { PlanApi };
