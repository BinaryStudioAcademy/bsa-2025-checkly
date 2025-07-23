import { ErrorMessage } from "../../enums/enums.js";
import { HTTPCode } from "../../modules/http/http.js";
import { HTTPError } from "../http-error/http-error.exception.js";

class AuthorizationError extends HTTPError {
	public constructor({
		cause,
		message = ErrorMessage.AUTHENTICATION_FAILED,
	}: {
		cause?: unknown;
		message?: string;
	} = {}) {
		super({
			cause,
			message,
			status: HTTPCode.UNAUTHORIZED,
		});
	}
}

export { AuthorizationError };
