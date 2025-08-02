import {
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/modules/users/users.js";

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
	email: "",
	name: "",
	password: "",
};

const DEFAULT_SIGN_IN_PAYLOAD: UserSignInRequestDto = {
	email: "",
	password: "",
};

const COMMON_AUTH_PLACEHOLDER = {
	email: "Enter your email",
	password: "Enter your password",
};

export {
	COMMON_AUTH_PLACEHOLDER,
	DEFAULT_SIGN_IN_PAYLOAD,
	DEFAULT_SIGN_UP_PAYLOAD,
};
