import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage, StorageKey } from "~/libs/modules/storage/storage.js";
import {
	type UserGetAllItemResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

import { AuthApiPath } from "./libs/enums/enums.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class AuthApi extends BaseHTTPApi {
	private authStorage: Storage;

	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.AUTH, storage });
		this.authStorage = storage;
	}

	public async getCurrentUser(): Promise<UserGetAllItemResponseDto> {
		const token = await this.authStorage.get(StorageKey.TOKEN);

		if (!token) {
			throw new Error("No authentication token found");
		}

		// For now, use hardcoded ID until JWT middleware is implemented
		const temporaryUserId = 1;

		// When JWT middleware is ready, will change to:
		// const response = await this.load(
		//   this.getFullEndpoint("/profile", {}), // No ID parameter
		//   {
		// 		contentType: ContentType.JSON,
		// 		hasAuth: true,
		// 		method: "GET"
		//   }
		// );

		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.PROFILE, {
				id: String(temporaryUserId),
			}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<UserGetAllItemResponseDto>();
	}

	public async signUp(
		payload: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.SIGN_UP, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<UserSignUpResponseDto>();
	}
}

export { AuthApi };
