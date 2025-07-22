import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";

class AuthorizationError extends HTTPError {
	public constructor({
		cause,
		message = "Authorization failed",
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
