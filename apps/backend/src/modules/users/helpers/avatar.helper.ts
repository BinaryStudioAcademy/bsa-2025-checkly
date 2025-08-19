import { type MultipartFile } from "@fastify/multipart";
import { type FastifyRequest } from "fastify";
import { HTTPCode, HTTPError } from "shared";

import { UPLOAD_MAX_FILE_SIZE_BYTES as AVATAR_MAX_FILE_SIZE } from "~/libs/constants/constants.js";
import { AvatarTypes } from "~/libs/enums/enums.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { fileService } from "~/modules/files/file.js";
import { type UserRepository } from "~/modules/users/user.repository.js";
import { ErrorMessage } from "~/plugins/authorization/libs/types/types.js";

type UserPlainObject = {
	avatarUrl: null | string;
	email: string;
	id: number;
	name: string;
};

const handleAvatarRemove = async (
	userRepository: UserRepository,
	userId: number,
): Promise<null | UserPlainObject> => {
	const existing = await userRepository.find(userId);

	if (!existing) {
		throw new HTTPError({
			message: ErrorMessage.USER_NOT_FOUND,
			status: HTTPCode.NOT_FOUND,
		});
	}

	const previousUrl = existing.toObject().avatarUrl;

	if (previousUrl) {
		try {
			await fileService.delete(previousUrl);
		} catch (error) {
			logger.warn(ErrorMessage.FAILED_TO_DELETE_PREVIOUS_AVATAR, {
				error,
				userId,
			});
		}
	}

	const updated = await userRepository.update(userId, { avatarUrl: null });

	return updated ? updated.toObject() : null;
};

const handleAvatarUpload = async (
	userRepository: UserRepository,
	request: FastifyRequest,
): Promise<UserPlainObject> => {
	const requestWithFile = request as FastifyRequest & {
		file: () => Promise<MultipartFile | undefined>;
	};
	const multipartFile = await requestWithFile.file();

	if (!multipartFile) {
		throw new HTTPError({
			message: ErrorMessage.FILE_MISSING,
			status: HTTPCode.BAD_REQUEST,
		});
	}

	if (!AvatarTypes.has(multipartFile.mimetype)) {
		throw new HTTPError({
			message: ErrorMessage.FILE_TYPE_INVALID,
			status: HTTPCode.BAD_REQUEST,
		});
	}

	const chunks: Buffer[] = [];
	let size = 0;

	for await (const chunk of multipartFile.file) {
		const current = chunk as Buffer;
		size += current.length;

		if (size > AVATAR_MAX_FILE_SIZE) {
			throw new HTTPError({
				message: ErrorMessage.FILE_TOO_LARGE,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		chunks.push(current);
	}

	const buffer = Buffer.concat(chunks);

	const parameters = request.params as Record<string, unknown> | undefined;
	const userIdRaw = parameters?.["id"];
	const userId = Number(userIdRaw);

	if (!Number.isInteger(userId)) {
		throw new HTTPError({
			message: ErrorMessage.ID_INVALID,
			status: HTTPCode.BAD_REQUEST,
		});
	}

	const existing = await userRepository.find(userId);

	if (!existing) {
		throw new HTTPError({
			message: ErrorMessage.USER_NOT_FOUND,
			status: HTTPCode.NOT_FOUND,
		});
	}

	const previousUrl = existing.toObject().avatarUrl;

	if (previousUrl) {
		try {
			await fileService.delete(previousUrl);
		} catch (error) {
			logger.warn(ErrorMessage.FAILED_TO_DELETE_PREVIOUS_AVATAR, {
				error,
				userId,
			});
		}
	}

	let newUrl: string;

	try {
		newUrl = await fileService.uploadUserAvatar(
			buffer,
			multipartFile.mimetype,
			multipartFile.filename,
		);
	} catch (error) {
		logger.error(ErrorMessage.FAILED_TO_UPLOAD_AVATAR, { error, userId });

		throw new HTTPError({
			message: ErrorMessage.AVATAR_UPDATE_FAILED,
			status: HTTPCode.INTERNAL_SERVER_ERROR,
		});
	}

	const updated = await userRepository.update(userId, { avatarUrl: newUrl });

	if (!updated) {
		throw new HTTPError({
			message: ErrorMessage.AVATAR_UPDATE_FAILED,
			status: HTTPCode.INTERNAL_SERVER_ERROR,
		});
	}

	return updated.toObject();
};

export { handleAvatarRemove, handleAvatarUpload };
