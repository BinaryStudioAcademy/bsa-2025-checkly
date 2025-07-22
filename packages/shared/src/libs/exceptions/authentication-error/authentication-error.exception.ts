import { type HTTPCode } from "../../../libs/modules/http/http.js";
import { type ValueOf } from "../../../libs/types/types.js";
import { HTTPError } from "../http-error/http-error.exception.js";

type Constructor = {
	cause?: unknown;
	message: string;
	status: ValueOf<typeof HTTPCode>;
};

class AuthenticationError extends HTTPError {
    public status: ValueOf<typeof HTTPCode>;

    public constructor({cause, message, status}: Constructor) {
        super({
            cause, 
            message,
            status
        });

        this.status = status;
    }
}

export { AuthenticationError };