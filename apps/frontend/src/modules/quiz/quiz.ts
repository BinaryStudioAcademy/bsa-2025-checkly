import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { QuizApi } from "./quiz-api.js";

const quizApi = new QuizApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { quizApi };
export { formatCategoryTitle } from "./libs/helpers/format-category-title.js";
export {
	type QuizAnswer,
	QuizCategory,
	type QuizQuestionsResponseDto,
	type QuizSubmission,
} from "./libs/types/types.js";
export { actions, reducer } from "./slices/quiz.js";
