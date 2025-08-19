import { APIPath, ContentType, HTTPRequestMethod } from "~/libs/enums/enums.js";
import { sanitizeFilename } from "~/libs/helpers/helpers.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { UsersApiPath } from "./libs/enums/enums.js";
import {
	type UserDto,
	type UserGetAllResponseDto,
	type UserUpdateRequestDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class UserApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.USERS, storage });
	}

	public async getAll(): Promise<UserGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(UsersApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: HTTPRequestMethod.GET,
			},
		);

		return await response.json<UserGetAllResponseDto>();
	}

	public async removeAvatar(userId: number): Promise<Response> {
		return await this.load(
			this.getFullEndpoint(UsersApiPath.AVATAR, { id: String(userId) }),
			{
				hasAuth: true,
				method: "DELETE",
			},
		);
	}

	public async updateMe(payload: UserUpdateRequestDto): Promise<UserDto> {
		const response = await this.load(
			this.getFullEndpoint(UsersApiPath.ME, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: HTTPRequestMethod.POST,
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<UserDto>();
	}

	public async uploadAvatar(userId: number, file: File): Promise<Response> {
		const formData = new FormData();
		const safeName = sanitizeFilename(file.name);
		formData.append("avatar", file, safeName);

		return await this.load(
			this.getFullEndpoint(UsersApiPath.AVATAR, { id: String(userId) }),
			{
				hasAuth: true,
				method: "POST",
				payload: formData,
			},
		);
	}
}

export { UserApi };