import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { PlanCategoryApi } from "./plan-category-api.js";

const planCategoryApi = new PlanCategoryApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { planCategoryApi };
export { type PlanCategoryDto } from "./libs/types/types.js";
export { actions, reducer } from "./slices/plan-category.js";
