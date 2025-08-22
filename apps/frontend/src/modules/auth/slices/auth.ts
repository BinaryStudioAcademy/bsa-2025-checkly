import {
	getCurrentUser,
	logout,
	resetPassword,
	sendResetLink,
	signIn,
	signUp,
	verifyToken,
} from "./actions.js";
import { actions } from "./auth.slice.js";

const allActions = {
	...actions,
	getCurrentUser,
	logout,
	resetPassword,
	sendResetLink,
	signIn,
	signUp,
	verifyToken,
};

export { allActions as actions };
export { reducer } from "./auth.slice.js";
