import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { QuizAnswerApi } from "./quiz-answers-api.js";

const quizAnswerApi = new QuizAnswerApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { quizAnswerApi };
export { actions, reducer } from "./slices/quiz-answers.js";
