import { type Encryptor } from "~/libs/modules/encryptor/encryptor.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import { UserValidationMessage } from "../libs/enums/enums.js";
import { type UserUpdateRequestDto } from "../libs/types/types.js";

const normalizeField = (value?: string): null | string | undefined => {
	const trimmed = value?.trim();

	return trimmed === "" ? null : trimmed;
};

type ValidateAndPrepareUpdateDataParameters = {
	encryptor: Encryptor;
	id: number;
	payload: UserUpdateRequestDto;
	userRepository: UserRepository;
};

const validateAndPrepareUpdateData = async ({
	encryptor,
	id,
	payload,
	userRepository,
}: ValidateAndPrepareUpdateDataParameters): Promise<
	Partial<UserUpdateRequestDto>
> => {
	const email = normalizeField(payload.email);
	const password = normalizeField(payload.password);
	const currentPassword = normalizeField(payload.currentPassword);
	const name = normalizeField(payload.name);

	if (email) {
		const userWithSameEmail = await userRepository.findByField("email", email);

		if (userWithSameEmail && userWithSameEmail.toObject().id !== id) {
			throw new HTTPError({
				message: UserValidationMessage.EMAIL_ALREADY_EXISTS,
				status: HTTPCode.CONFLICT,
			});
		}
	}

	if (password) {
		if (!currentPassword) {
			throw new HTTPError({
				message: UserValidationMessage.CURRENT_PASSWORD_REQUIRED,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const currentUser = await userRepository.find(id);

		if (!currentUser) {
			throw new HTTPError({
				message: UserValidationMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { passwordHash, passwordSalt } = currentUser.getPasswordData();
		const isCurrentPasswordValid = await encryptor.compare(
			currentPassword,
			passwordHash,
			passwordSalt,
		);

		if (!isCurrentPasswordValid) {
			throw new HTTPError({
				message: UserValidationMessage.CURRENT_PASSWORD_INVALID,
				status: HTTPCode.UNPROCESSED_ENTITY,
			});
		}
	}

	const updateData: Partial<UserUpdateRequestDto> = {};

	if (payload.dob !== undefined) {
		updateData.dob = payload.dob;
	}

	if (email) {
		updateData.email = email;
	}

	if (name) {
		updateData.name = name;
	}

	if (password) {
		const { hash, salt } = await encryptor.encrypt(password);
		Object.assign(updateData, {
			passwordHash: hash,
			passwordSalt: salt,
		});
	}

	return updateData;
};

export { validateAndPrepareUpdateData };
