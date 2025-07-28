import { type FastifyReply, type FastifyRequest } from "fastify";

import { ServerErrorType } from "~/libs/enums/enums.js";

const MIN_DETAILS_LENGTH = 1;
const DEFAULT_ERROR_MESSAGE = "An error occurred";
const MIN_ERROR_STATUS_CODE = 400;
const FIRST_DETAIL_INDEX = 0;

type ErrorPayload = {
	details?: Array<{ message: string; path: (number | string)[] }>;
	errorType?: string;
	message?: string;
};

type FastifyPayload =
	| boolean
	| ErrorPayload
	| null
	| number
	| Record<string, unknown>
	| string
	| undefined
	| unknown[];

function initErrorMapperMiddleware() {
	return async (
		request: FastifyRequest,
		reply: FastifyReply,
	): Promise<void> => {
		const originalSend = reply.send.bind(reply);

		reply.send = (payload: FastifyPayload): FastifyReply => {
			if (
				reply.statusCode >= MIN_ERROR_STATUS_CODE &&
				payload &&
				typeof payload === "object"
			) {
				const errorPayload = payload as ErrorPayload;

				let errorType: string = ServerErrorType.COMMON;
				let message: string = errorPayload.message || DEFAULT_ERROR_MESSAGE;

				if (
					errorPayload.details &&
					Array.isArray(errorPayload.details) &&
					errorPayload.details.length >= MIN_DETAILS_LENGTH
				) {
					errorType = ServerErrorType.VALIDATION;
					message =
						errorPayload.details[FIRST_DETAIL_INDEX]?.message ||
						errorPayload.message ||
						DEFAULT_ERROR_MESSAGE;
				}

				const standardizedError = {
					errorType,
					message,
				};

				return originalSend(standardizedError);
			}

			return originalSend(payload);
		};
	};
}

export { initErrorMapperMiddleware };
