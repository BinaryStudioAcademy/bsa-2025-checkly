import { APIPath, ContentType, HTTPRequestMethod } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type PlanDaysTaskDto } from "~/modules/plans/plans.js";

import { PlansApiPath } from "./libs/enums/enums.js";
import {
	type PlanDayRegenerationRequestDto,
	type PlanRegenerationRequestDto,
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
			this.getFullEndpoint(PlansApiPath.GENERATE, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: HTTPRequestMethod.POST,
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<PlanDaysTaskDto>();
	}

	public async getByUserId(userId: number): Promise<PlanDaysTaskDto> {
		const response = await this.load(
			this.getFullEndpoint(PlansApiPath.$USER_ID, { userId }),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: HTTPRequestMethod.GET,
			},
		);

		return await response.json<PlanDaysTaskDto>();
	}

	public async regeneratePlan(
		payload: PlanRegenerationRequestDto,
	): Promise<PlanDaysTaskDto> {
		const { id } = payload;

		const response = await this.load(
			this.getFullEndpoint(PlansApiPath.REGENERATE, {
				id,
			}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: HTTPRequestMethod.POST,
			},
		);

		return await response.json<PlanDaysTaskDto>();
	}

	public async regeneratePlanDay(
		payload: PlanDayRegenerationRequestDto,
	): Promise<PlanDaysTaskDto> {
		const { dayId, planId } = payload;

		const response = await this.load(
			this.getFullEndpoint(PlansApiPath.REGENERATE_DAY, {
				dayId,
				planId,
			}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: HTTPRequestMethod.POST,
			},
		);

		return await response.json<PlanDaysTaskDto>();
	}

	public async regenerateTask(payload: {
		dayId: number;
		planId: number;
		taskId: number;
	}): Promise<PlanDaysTaskDto> {
		const { dayId, planId, taskId } = payload;

		const response = await this.load(
			this.getFullEndpoint(PlansApiPath.REGENERATE_TASK, {
				dayId,
				planId,
				taskId,
			}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: HTTPRequestMethod.POST,
			},
		);

		return await response.json<PlanDaysTaskDto>();
	}
}

export { PlanApi };
