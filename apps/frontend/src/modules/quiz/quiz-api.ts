import { APIPath, ContentType, HTTPRequestMethod } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type QuizQuestionsResponseDto } from "~/modules/quiz/libs/types/types.js";

import { QuizApiPath } from "./libs/enums/enums.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class QuizApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.QUIZ_QUESTIONS, storage });
	}

	public async getQuestions(): Promise<QuizQuestionsResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(QuizApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: HTTPRequestMethod.GET,
			},
		);

		return await response.json<QuizQuestionsResponseDto>();
	}
}

export { QuizApi };
