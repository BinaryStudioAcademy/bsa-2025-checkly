import { HTTPCode } from "shared";

import {
	type APIHandlerOptions,
	type APIHandlerResponse,
} from "~/libs/modules/controller/controller.js";
import { type UserService } from "~/modules/users/user.service.js";

const INVALID_ID_RESPONSE: APIHandlerResponse = {
	payload: { message: "Invalid user id" },
	status: HTTPCode.BAD_REQUEST,
};

const FORBIDDEN_RESPONSE: APIHandlerResponse = {
	payload: { message: "Forbidden" },
	status: HTTPCode.UNAUTHORIZED,
};

async function removeAvatarController(
	userService: UserService,
	{ params, user }: APIHandlerOptions,
): Promise<APIHandlerResponse> {
	const routeParameters = params as undefined | { id?: unknown };
	const idRaw = routeParameters?.id;
	const userId = Number(idRaw);

	if (!Number.isInteger(userId)) {
		return INVALID_ID_RESPONSE;
	}

	if (!user || user.id !== userId) {
		return FORBIDDEN_RESPONSE;
	}

	const payload = await userService.removeAvatar(userId);

	return { payload, status: HTTPCode.OK };
}

async function uploadAvatarController(
	userService: UserService,
	handlerOptions: APIHandlerOptions,
): Promise<APIHandlerResponse> {
	const { originalRequest, params, user } = handlerOptions;
	const routeParameters = params as undefined | { id?: unknown };
	const idRaw = routeParameters?.id;
	const userId = Number(idRaw);

	if (!Number.isInteger(userId)) {
		return INVALID_ID_RESPONSE;
	}

	if (!user || user.id !== userId) {
		return FORBIDDEN_RESPONSE;
	}

	if (!originalRequest) {
		return {
			payload: { message: "Missing original request for multipart processing" },
			status: HTTPCode.BAD_REQUEST,
		};
	}

	const result = await userService.uploadAvatar(originalRequest as never);

	return { payload: result, status: HTTPCode.OK };
}

export { removeAvatarController, uploadAvatarController };
