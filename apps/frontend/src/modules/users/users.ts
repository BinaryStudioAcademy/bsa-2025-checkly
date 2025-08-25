import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { UserApi } from "./users-api.js";

const userApi = new UserApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { userApi };
export {
	type ForgotPasswordRequestDto,
	type ResetPasswordFormValidationSchema,
	type ResetPasswordRequestDto,
	type SignUpFormValidationSchema,
	type UserDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
	type UserUpdateRequestDto,
	type VerifyTokenRequestDto,
} from "./libs/types/types.js";
export {
	forgotPasswordValidationSchema,
	resetPasswordValidationSchema,
	userSignInValidationSchema,
	userSignUpValidationSchemaExtended,
	userUpdateValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
