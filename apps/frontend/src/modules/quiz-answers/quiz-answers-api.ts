import { APIPath, ContentType, HTTPRequestMethod } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { QuizAnswerApiPath } from "./libs/enums/enums.js";
import { type QuizAnswer } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

type QuizAnswersRequestDto = {
	answers: QuizAnswer[];
	quizId: number;
};

class QuizAnswerApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.QUIZ_ANSWERS, storage });
	}

	public async create(payload: QuizAnswersRequestDto): Promise<void> {
		const response = await this.load(
			this.getFullEndpoint(QuizAnswerApiPath.ANSWER_OTPIONS, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: HTTPRequestMethod.POST,
				payload: JSON.stringify(payload),
			},
		);

		await response.json();
	}
}

export { QuizAnswerApi };
