import {
	getCurrentUser,
	logout,
	sendResetLink,
	signIn,
	signUp,
} from "./actions.js";
import { actions } from "./auth.slice.js";

const allActions = {
	...actions,
	getCurrentUser,
	logout,
	sendResetLink,
	signIn,
	signUp,
};

export { allActions as actions };
export { reducer } from "./auth.slice.js";
