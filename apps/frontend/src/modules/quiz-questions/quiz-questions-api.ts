import { APIPath, ContentType, HTTPRequestMethod } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type QuizQuestionsResponseDto } from "~/modules/quiz-questions/libs/types/types.js";

import { QuizQuestionApiPath } from "./libs/enums/enums.js";
import { buildQueryString } from "./libs/helpers/helpers.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class QuizQuestionApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.QUIZ_QUESTIONS, storage });
	}

	public async getQuestionsByCategoryId(
		categoryId: number,
	): Promise<QuizQuestionsResponseDto> {
		const queryString = buildQueryString({ categoryId });
		const endpointWithQuery =
			this.getFullEndpoint(QuizQuestionApiPath.ROOT, {}) + `?${queryString}`;
		const response = await this.load(endpointWithQuery, {
			contentType: ContentType.JSON,
			hasAuth: false,
			method: HTTPRequestMethod.GET,
		});

		return await response.json<QuizQuestionsResponseDto>();
	}
}

export { QuizQuestionApi };
