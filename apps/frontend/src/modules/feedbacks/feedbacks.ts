import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { FeedbackApi } from "./feedbacks-api.js";

const feedbackApi = new FeedbackApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { feedbackApi };
export { getIdParameter } from "./libs/helpers/helpers.js";
export {
	type FeedbackCreateRequestDto,
	type FeedbackDto,
	type feedbackPaginationParameters,
	type FeedbackServiceReturns,
	type FeedbackUpdateRequestDto,
	type IdParameter,
} from "./libs/types/types.js";
export {
	feedbackCreateValidationSchema,
	feedbackUpdateValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
