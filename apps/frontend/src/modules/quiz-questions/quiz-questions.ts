import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";
import { QuizQuestionApi } from "~/modules/quiz-questions/quiz-questions-api.js";

const quizQuestionApi = new QuizQuestionApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { quizQuestionApi };
export { type QuizAnswer } from "~/modules/quiz-questions/libs/types/types.js";
export { actions, reducer } from "~/modules/quiz-questions/slices/quiz.js";
