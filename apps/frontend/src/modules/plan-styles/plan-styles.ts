import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { PlanStylesApi } from "./plan-styles-api.js";

const planStylesApi = new PlanStylesApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { planStylesApi };
export { actions, reducer } from "./slices/plan-style.js";
export { type PlanStyleDto } from "shared";
