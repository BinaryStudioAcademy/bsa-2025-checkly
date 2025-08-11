import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";
import { QuizApi } from "~/modules/quiz/quiz-api.js";

const quizApi = new QuizApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { quizApi };
export {
	type QuizAnswer,
	type QuizCategoryValue,
} from "~/modules/quiz/libs/types/types.js";
export { actions, reducer } from "~/modules/quiz/slices/quiz.js";
