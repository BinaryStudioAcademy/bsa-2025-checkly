import { type ResetPasswordRequestDto } from "~/modules/users/users.js";

const DEFAULT_RESET_PASSWORD_VALUES: ResetPasswordRequestDto = {
	password: "",
	token: "",
	userId: -1,
};

export { DEFAULT_RESET_PASSWORD_VALUES };
