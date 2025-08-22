import { APIPath, ContentType, HTTPRequestMethod } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import {
	type ForgotPasswordRequestDto,
	type ResetPasswordRequestDto,
	type UserDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
	type VerifyTokenRequestDto,
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

	public async getCurrentUser(): Promise<UserDto> {
		const response = await this.load(this.getFullEndpoint(AuthApiPath.ME, {}), {
			contentType: ContentType.JSON,
			hasAuth: true,
			method: HTTPRequestMethod.GET,
		});

		return await response.json<UserDto>();
	}

	public async resetPassword(payload: ResetPasswordRequestDto): Promise<null> {
		await this.load(this.getFullEndpoint(AuthApiPath.RESET_PASSWORD, {}), {
			contentType: ContentType.JSON,
			hasAuth: false,
			method: HTTPRequestMethod.POST,
			payload: JSON.stringify(payload),
		});

		return null;
	}

	public async sendResetLink(payload: ForgotPasswordRequestDto): Promise<null> {
		await this.load(this.getFullEndpoint(AuthApiPath.FORGOT_PASSWORD, {}), {
			contentType: ContentType.JSON,
			hasAuth: false,
			method: HTTPRequestMethod.POST,
			payload: JSON.stringify(payload),
		});

		return null;
	}

	public async signIn(
		payload: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.SIGN_IN, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: HTTPRequestMethod.POST,
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
				method: HTTPRequestMethod.POST,
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<UserSignUpResponseDto>();
	}

	public async verifyToken(payload: VerifyTokenRequestDto): Promise<null> {
		await this.load(this.getFullEndpoint(AuthApiPath.VERIFY_TOKEN, {}), {
			contentType: ContentType.JSON,
			hasAuth: false,
			method: HTTPRequestMethod.POST,
			payload: JSON.stringify(payload),
		});

		return null;
	}
}

export { AuthApi };
