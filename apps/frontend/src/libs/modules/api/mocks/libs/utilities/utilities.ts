import { HttpResponse, type JsonBodyType } from "msw";

import { ServerErrorType } from "~/libs/enums/enums.js";

const makeErrorResponse = (
	message: string,
	status: number,
): HttpResponse<JsonBodyType> =>
	HttpResponse.json({ errorType: ServerErrorType.COMMON, message }, { status });

export { makeErrorResponse };
