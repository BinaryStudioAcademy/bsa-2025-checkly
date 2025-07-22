import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";

class AuthorizationError extends HTTPError {
	public constructor({
		message = "Authorization failed",
		cause,
	}: {
		message?: string;
		cause?: unknown;
	} = {}) {
		super({
			message,
			status: HTTPCode.UNAUTHORIZED,
			cause,
		});
	}
}

export { AuthorizationError };
