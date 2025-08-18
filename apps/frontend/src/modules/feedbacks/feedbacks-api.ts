import { APIPath, ContentType, HTTPRequestMethod } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { FeedbackApiPath } from "~/modules/feedbacks/libs/enums/enums.js";
import {
	type FeedbackCreateRequestDto,
	type FeedbackDto,
	type FeedbackUpdateRequestDto,
} from "~/modules/feedbacks/libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

type FeedbackFindAllOptions = {
	limit?: number;
	page?: number;
};

type feedbackPaginationParameters = {
	items: FeedbackDto[];
	limit: number;
	page: number;
	total: number;
};

class FeedbackApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.FEEDBACKS, storage });
	}

	public async create(payload: FeedbackCreateRequestDto): Promise<FeedbackDto> {
		const response = await this.load(
			this.getFullEndpoint(FeedbackApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: HTTPRequestMethod.POST,
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<FeedbackDto>();
	}

	public async delete(id: number): Promise<boolean> {
		const response = await this.load(
			this.getFullEndpoint(FeedbackApiPath.FEEDBACK, { id: String(id) }),
			{
				hasAuth: true,
				method: HTTPRequestMethod.DELETE,
			},
		);

		return response.ok;
	}

	public async findAll(
		options: FeedbackFindAllOptions = {},
	): Promise<feedbackPaginationParameters> {
		const { page = 1, limit = 10 } = options;
		const offset = (page - 1) * limit;

		const endpoint = this.getFullEndpoint(FeedbackApiPath.ROOT, {});

		const fullEndpoint = this.getEndpointWithQuery(endpoint, {
			limit,
			offset,
		});

		const response = await this.load(fullEndpoint, {
			contentType: ContentType.JSON,
			hasAuth: false,
			method: HTTPRequestMethod.GET,
		});

		const data = await response.json<feedbackPaginationParameters>();

		return data;
	}

	public async findById(id: number): Promise<FeedbackDto | null> {
		const response = await this.load(
			this.getFullEndpoint(FeedbackApiPath.FEEDBACK, { id: String(id) }),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: HTTPRequestMethod.GET,
			},
		);

		if (!response.ok) {
			return null;
		}

		return await response.json<FeedbackDto>();
	}

	public async update(
		id: number,
		payload: FeedbackUpdateRequestDto,
	): Promise<FeedbackDto | null> {
		const response = await this.load(
			this.getFullEndpoint(FeedbackApiPath.FEEDBACK, { id: String(id) }),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: HTTPRequestMethod.PUT,
				payload: JSON.stringify(payload),
			},
		);

		if (!response.ok) {
			return null;
		}

		return await response.json<FeedbackDto>();
	}
}

export { FeedbackApi };
