import {
	APIPath,
	ContentType,
	HTTPRequestMethod,
	QuizApiPath,
} from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import {
	type QuizAnswersRequestDto,
	type QuizQuestionsResponseDto,
} from "~/modules/quiz/libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class QuizApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: QuizApiPath.ROOT, storage });
	}

	public async getQuestions(): Promise<QuizQuestionsResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(APIPath.QUIZ_QUESTIONS, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: HTTPRequestMethod.GET,
			},
		);

		return await response.json<QuizQuestionsResponseDto>();
	}

	public async submitQuiz(payload: QuizAnswersRequestDto): Promise<boolean> {
		const response = await this.load(this.getFullEndpoint(APIPath.QUIZ, {}), {
			contentType: ContentType.JSON,
			hasAuth: false,
			method: HTTPRequestMethod.POST,
			payload: JSON.stringify(payload),
		});

		return response.ok;
	}
}

export { QuizApi };
