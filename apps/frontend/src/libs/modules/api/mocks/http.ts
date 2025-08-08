import { createOpenApiHttp } from "openapi-msw";

import { config } from "~/libs/modules/config/config.js";

import { type ApiPaths } from "../schema/schema.js";

const http = createOpenApiHttp<ApiPaths>({
	baseUrl: config.ENV.API.ORIGIN_URL,
});

export { http };
