import { HTTPCode } from "shared";

import {
	type APIHandlerOptions,
	type APIHandlerResponse,
} from "~/libs/modules/controller/controller.js";
import { type RouteParametersWithId } from "~/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";
import { ErrorMessage } from "~/plugins/authorization/libs/types/types.js";

const INVALID_ID_RESPONSE: APIHandlerResponse = {
	payload: { message: ErrorMessage.ID_INVALID },
	status: HTTPCode.BAD_REQUEST,
};

const FORBIDDEN_RESPONSE: APIHandlerResponse = {
	payload: { message: ErrorMessage.FORBIDDEN },
	status: HTTPCode.FORBIDDEN,
};

const removeAvatarController = async (
	userService: UserService,
	{ params, user }: APIHandlerOptions,
): Promise<APIHandlerResponse> => {
	const routeParameters = params as RouteParametersWithId | undefined;
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
};

const uploadAvatarController = async (
	userService: UserService,
	handlerOptions: APIHandlerOptions,
): Promise<APIHandlerResponse> => {
	const { originalRequest, params, user } = handlerOptions;
	const routeParameters = params as RouteParametersWithId | undefined;
	const idRaw = routeParameters?.id;
	const userId = Number(idRaw);

	if (!Number.isInteger(userId)) {
		return INVALID_ID_RESPONSE;
	}

	if (user?.id !== userId) {
		return FORBIDDEN_RESPONSE;
	}

	if (!originalRequest) {
		return {
			payload: { message: ErrorMessage.MISSING_REQUEST },
			status: HTTPCode.BAD_REQUEST,
		};
	}

	const result = await userService.uploadAvatar(originalRequest as never);

	return { payload: result, status: HTTPCode.OK };
};

export { removeAvatarController, uploadAvatarController };
