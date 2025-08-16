import {
	avatarRemove,
	avatarUpload,
	getCurrentUser,
  logout,
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
	logout,
	signIn,
	signUp,
	updateProfile,
};

export { allActions as actions };
export { reducer } from "./auth.slice.js";
