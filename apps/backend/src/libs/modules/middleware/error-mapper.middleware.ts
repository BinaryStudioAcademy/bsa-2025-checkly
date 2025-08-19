import {
	ErrorConstants,
	ServerErrorType,
	UserValidationRule,
} from "~/libs/enums/enums.js";
import {
	type EnumValue,
	type FastifyReply,
	type FastifyRequest,
	type ServerErrorDetail,
} from "~/libs/types/types.js";

type ErrorPayload = {
	details?: ServerErrorDetail[];
	errorType?: string;
	message?: string;
};

type ServerErrorTypeValue = EnumValue<typeof ServerErrorType>;

const initErrorMapperMiddleware = () => {
	return async (
		request: FastifyRequest,
		reply: FastifyReply,
	): Promise<void> => {
		const originalSend = reply.send.bind(reply);

		reply.send = (payload: unknown): FastifyReply => {
			if (
				reply.statusCode >= ErrorConstants.MIN_ERROR_STATUS_CODE &&
				typeof payload === "object"
			) {
				const errorPayload = payload as ErrorPayload;

				const { details } = errorPayload;
				const hasDetails =
					Array.isArray(details) &&
					details.length >= UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH;

				const errorType: ServerErrorTypeValue = hasDetails
					? ServerErrorType.VALIDATION
					: ServerErrorType.COMMON;

				const message: string =
					(hasDetails
						? details[ErrorConstants.FIRST_DETAIL_INDEX]?.message
						: errorPayload.message) ?? ErrorConstants.DEFAULT_ERROR_MESSAGE;

				const generalError = {
					errorType,
					message,
				};

				return originalSend(generalError);
			}

			return originalSend(payload);
		};
	};
};

export { initErrorMapperMiddleware };
