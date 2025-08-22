import { type ResetPasswordRequestDto } from "~/modules/users/users.js";

const getDefaultResetPasswordValues = (
	userId: number,
): ResetPasswordRequestDto => {
	return { password: "", userId };
};

export { getDefaultResetPasswordValues };
