import { APIPath, ContentType, HTTPRequestMethod } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import {
	type FeedbackCreateRequestDto,
	type FeedbackDto,
	type FeedbackUpdateRequestDto,
	getIdParameter,
	type Pagination,
} from "~/modules/feedbacks/feedbacks.js";
import {
	FeedbackApiPath,
	FeedbackGetAllOption,
} from "~/modules/feedbacks/libs/enums/enums.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

type FeedbackFindAllOptions = {
	limit?: number;
	page?: number;
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
			this.getFullEndpoint(FeedbackApiPath.FEEDBACK, getIdParameter(id)),
			{
				hasAuth: true,
				method: HTTPRequestMethod.DELETE,
			},
		);

		return response.ok;
	}

	public async findAll(
		options: FeedbackFindAllOptions = {},
	): Promise<Pagination<FeedbackDto>> {
		const {
			limit = FeedbackGetAllOption.PAGE_SIZE,
			page = FeedbackGetAllOption.SINGLE_PAGE,
		} = options;
		const offset = (page - FeedbackGetAllOption.SINGLE_PAGE) * limit;

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

		const data = (await response.json()) as Pagination<FeedbackDto>;

		return data;
	}

	public async findById(id: number): Promise<FeedbackDto> {
		const response = await this.load(
			this.getFullEndpoint(FeedbackApiPath.FEEDBACK, getIdParameter(id)),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: HTTPRequestMethod.GET,
			},
		);

		return await response.json<FeedbackDto>();
	}

	public async update(
		id: number,
		payload: FeedbackUpdateRequestDto,
	): Promise<FeedbackDto> {
		const response = await this.load(
			this.getFullEndpoint(FeedbackApiPath.FEEDBACK, getIdParameter(id)),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: HTTPRequestMethod.PUT,
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<FeedbackDto>();
	}
}

export { FeedbackApi };
