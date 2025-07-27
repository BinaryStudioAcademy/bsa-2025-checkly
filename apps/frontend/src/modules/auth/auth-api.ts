import { APIPath, ContentType, HTTPMethodEnum } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import {
	type UserGetAllItemResponseDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
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
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.AUTH, storage });
	}

	public async getCurrentUser(): Promise<UserGetAllItemResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.PROFILE, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: HTTPMethodEnum.GET,
			},
		);

		return await response.json<UserGetAllItemResponseDto>();
	}

	public async signIn(
		payload: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.SIGN_IN, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: HTTPMethodEnum.POST,
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<UserSignInResponseDto>();
	}

	public async signUp(
		payload: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.SIGN_UP, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: HTTPMethodEnum.POST,
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<UserSignUpResponseDto>();
	}
}

export { AuthApi };
