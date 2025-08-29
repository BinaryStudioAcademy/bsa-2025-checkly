import { type Encryptor } from "~/libs/modules/encryptor/encryptor.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import { UserValidationMessage } from "../libs/enums/enums.js";
import { type UserUpdateRequestDto } from "../libs/types/types.js";

const normalizeField = (value?: null | string): null | string | undefined => {
	if (value === null) {
		return null;
	}

	const trimmed = value?.trim();

	return trimmed === "" ? null : trimmed;
};

type UserUpdateData = Partial<UserUpdateRequestDto> & {
	passwordHash?: string;
	passwordSalt?: string;
};

type ValidateAndPrepareUpdateDataParameters = {
	encryptor: Encryptor;
	id: number;
	isReseting: boolean;
	payload: UserUpdateRequestDto;
	userRepository: UserRepository;
};

type ValidateDataParameters = {
	currentPassword?: null | string;
	email?: null | string;
	encryptor: Encryptor;
	id: number;
	isReseting: boolean;
	password?: null | string;
	userRepository: UserRepository;
};

const validateAndPrepareUpdateData = async ({
	encryptor,
	id,
	isReseting = false,
	payload,
	userRepository,
}: ValidateAndPrepareUpdateDataParameters): Promise<UserUpdateData> => {
	const email = normalizeField(payload.email);
	const password = normalizeField(payload.password);
	const currentPassword = isReseting
		? undefined
		: normalizeField(payload.currentPassword);
	const name = normalizeField(payload.name);

	await validateData({
		currentPassword,
		email,
		encryptor,
		id,
		isReseting,
		password,
		userRepository,
	});

	let updateData: UserUpdateData = {};

	if (payload.dob !== undefined) {
		updateData.dob = normalizeField(payload.dob);
	}

	if (email) {
		updateData.email = email;
	}

	if (name) {
		updateData.name = name;
	}

	if (password) {
		const { hash, salt } = await encryptor.encrypt(password);
		updateData = { ...updateData, passwordHash: hash, passwordSalt: salt };
	}

	return updateData;
};

const validateData = async ({
	currentPassword,
	email,
	encryptor,
	id,
	isReseting,
	password,
	userRepository,
}: ValidateDataParameters): Promise<void> => {
	if (email) {
		const userWithSameEmail = await userRepository.findByField("email", email);

		if (userWithSameEmail && userWithSameEmail.toObject().id !== id) {
			throw new HTTPError({
				message: UserValidationMessage.EMAIL_ALREADY_EXISTS,
				status: HTTPCode.CONFLICT,
			});
		}
	}

	if (password && !isReseting) {
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
};

export { validateAndPrepareUpdateData };
