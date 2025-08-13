import { type MultipartFile } from "@fastify/multipart";
import { type FastifyRequest } from "fastify";
import {
	UPLOAD_MAX_FILE_SIZE_BYTES as AVATAR_MAX_FILE_SIZE,
	HTTPCode,
	HTTPError,
} from "shared";

import { logger } from "../../../libs/modules/logger/logger.js";
import { fileService } from "../../files/file.js";
import { type UserRepository } from "../user.repository.js";

const AVATAR_ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png"]);

type UserPlainObject = {
	avatarUrl: null | string;
	email: string;
	id: number;
	name: string;
};

async function handleAvatarRemove(
	userRepository: UserRepository,
	userId: number,
): Promise<null | UserPlainObject> {
	const existing = await userRepository.find(userId);

	if (!existing) {
		throw new HTTPError({
			message: "User not found",
			status: HTTPCode.NOT_FOUND,
		});
	}

	const previousUrl = existing.toObject().avatarUrl;

	if (previousUrl) {
		try {
			await fileService.deleteFile(previousUrl);
		} catch (error) {
			logger.warn("Failed to delete previous avatar", { error, userId });
		}
	}

	const updated = await userRepository.update(userId, { avatarUrl: null });

	return updated ? updated.toObject() : null;
}

async function handleAvatarUpload(
	userRepository: UserRepository,
	request: FastifyRequest,
): Promise<UserPlainObject> {
	const requestWithFile = request as FastifyRequest & {
		file: () => Promise<MultipartFile | undefined>;
	};
	const multipartFile = await requestWithFile.file();

	if (!multipartFile) {
		throw new HTTPError({
			message: "No file uploaded",
			status: HTTPCode.BAD_REQUEST,
		});
	}

	if (!AVATAR_ALLOWED_MIME_TYPES.has(multipartFile.mimetype)) {
		throw new HTTPError({
			message: "Invalid file type. Allowed: image/png, image/jpeg",
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
				message: "File too large (max 2MB)",
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
			message: "Invalid user id",
			status: HTTPCode.BAD_REQUEST,
		});
	}

	const existing = await userRepository.find(userId);

	if (!existing) {
		throw new HTTPError({
			message: "User not found",
			status: HTTPCode.NOT_FOUND,
		});
	}

	const previousUrl = existing.toObject().avatarUrl;

	if (previousUrl) {
		try {
			await fileService.deleteFile(previousUrl);
		} catch (error) {
			logger.warn("Failed to delete previous avatar before new upload", {
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
		logger.error("Failed to upload avatar to storage", { error, userId });

		throw new HTTPError({
			message: "Failed to upload avatar",
			status: HTTPCode.INTERNAL_SERVER_ERROR,
		});
	}

	const updated = await userRepository.update(userId, { avatarUrl: newUrl });

	if (!updated) {
		throw new HTTPError({
			message: "Failed to update user avatar",
			status: HTTPCode.INTERNAL_SERVER_ERROR,
		});
	}

	return updated.toObject();
}

export { handleAvatarRemove, handleAvatarUpload };
