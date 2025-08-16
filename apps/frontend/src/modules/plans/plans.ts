import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { PlanApi } from "./plans-api.js";

const planApi = new PlanApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { planApi };
export { type PlanDaysTaskDto } from "./libs/types/types.js";
export { actions, reducer } from "./slices/plan.js";
