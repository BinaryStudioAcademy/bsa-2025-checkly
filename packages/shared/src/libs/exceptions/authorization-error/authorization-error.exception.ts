import { type HTTPCode } from "../../modules/http/http.js";
import { type ValueOf } from "../../types/types.js";
import { HTTPError } from "../http-error/http-error.exception.js";

type Constructor = {
	cause?: unknown;
	message: string;
	status: ValueOf<typeof HTTPCode>;
};

class AuthorizationError extends HTTPError {
	public constructor({ cause, message, status }: Constructor) {
		super({
			cause,
			message,
			status,
		});

		this.status = status;
	}
}

export { AuthorizationError };
