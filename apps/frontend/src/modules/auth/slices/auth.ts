import {
	avatarRemove,
	avatarUpload,
	getCurrentUser,
	logout,
	resetPassword,
	sendResetLink,
	signIn,
	signUp,
	updateProfile,
	verifyToken,
} from "./actions.js";
import { actions } from "./auth.slice.js";

const allActions = {
	...actions,
	avatarRemove,
	avatarUpload,
	getCurrentUser,
	logout,
	resetPassword,
	sendResetLink,
	signIn,
	signUp,
	updateProfile,
	verifyToken,
};

export { allActions as actions };
export { reducer } from "./auth.slice.js";
