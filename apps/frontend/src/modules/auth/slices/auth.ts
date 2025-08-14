import {
	avatarRemove,
	avatarUpload,
	getCurrentUser,
	signIn,
	signUp,
	updateProfile,
} from "./actions.js";
import { actions } from "./auth.slice.js";

const allActions = {
	...actions,
	avatarRemove,
	avatarUpload,
	getCurrentUser,
	signIn,
	signUp,
	updateProfile,
};

export { allActions as actions };
export { reducer } from "./auth.slice.js";
