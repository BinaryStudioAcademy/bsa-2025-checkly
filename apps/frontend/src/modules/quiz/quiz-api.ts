import { APIPath, ContentType, HTTPRequestMethod } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { type QuizQuestionsResponseDto, type QuizSubmission } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class QuizApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.QUIZ, storage });
	}

	public async getQuestions(): Promise<QuizQuestionsResponseDto> {	
		const response = await this.load(
			this.getFullEndpoint({}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: HTTPRequestMethod.GET,
			},
		);

		return await response.json<QuizQuestionsResponseDto>();
	}

	public async submitQuiz(payload: QuizSubmission): Promise<void> {
		await this.load(this.getFullEndpoint({}), {
			contentType: ContentType.JSON,
			hasAuth: true,
			method: HTTPRequestMethod.POST,
			payload: JSON.stringify(payload),
		});
	}
}

export { QuizApi }; 