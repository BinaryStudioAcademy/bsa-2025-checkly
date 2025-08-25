import { APIPath, ContentType, HTTPRequestMethod } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type PlanDaysTaskDto } from "~/modules/plans/plans.js";

import { PlansApiPath } from "./libs/enums/enums.js";
import { buildQueryString } from "./libs/helpers/helpers.js";
import {
	type GeneratePlanRequestDto,
	type PlanSearchQueryParameter,
	type PlanWithCategoryDto,
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

	public async findWithRelations(planId: number): Promise<PlanDaysTaskDto> {
		const response = await this.load(
			this.getFullEndpoint(PlansApiPath.PLAN, { id: String(planId) }),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: HTTPRequestMethod.GET,
			},
		);

		return await response.json<PlanDaysTaskDto>();
	}

	public async generate(
		payload: GeneratePlanRequestDto,
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

	public async getAllUserPlans(): Promise<PlanWithCategoryDto[]> {
		const response = await this.load(
			this.getFullEndpoint(PlansApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: HTTPRequestMethod.GET,
			},
		);

		return await response.json<PlanWithCategoryDto[]>();
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

	public async updateStyle(
		planId: number,
		styleId: number,
	): Promise<PlanDaysTaskDto> {
		const response = await this.load(
			this.getFullEndpoint(PlansApiPath.PLAN_STYLE, { id: planId.toString() }),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: HTTPRequestMethod.PATCH,
				payload: JSON.stringify({ styleId }),
			},
		);

		return await response.json<PlanDaysTaskDto>();
	}
}

export { PlanApi };
