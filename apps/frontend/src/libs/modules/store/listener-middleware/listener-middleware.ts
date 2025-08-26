import {
	createListenerMiddleware,
	isAnyOf,
	isFulfilled,
	isRejected,
} from "@reduxjs/toolkit";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { SuccessMessage } from "~/libs/enums/success-messages.enum.js";
import { getErrorMessage } from "~/libs/helpers/get-error-message.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";
import { actions as authActions } from "~/modules/auth/auth.js";

import { navigation } from "../../navigation/navigation.js";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	effect: (action) => {
		notifications.error(getErrorMessage(action));
	},
	matcher: isRejected,
});

listenerMiddleware.startListening({
	effect: async () => {
		await navigation.navigateTo(AppRoute.ROOT);
	},
	matcher: isAnyOf(authActions.signIn.fulfilled, authActions.signUp.fulfilled),
});

listenerMiddleware.startListening({
	effect: () => {
		notifications.success(SuccessMessage.SIGN_UP);
	},
	matcher: isFulfilled(authActions.signUp),
});

listenerMiddleware.startListening({
	effect: () => {
		notifications.success(SuccessMessage.PROFILE_UPDATE);
	},
	matcher: isFulfilled(authActions.updateProfile),
});

listenerMiddleware.startListening({
	effect: () => {
		notifications.success(SuccessMessage.AVATAR_UPDATE);
	},
	matcher: isFulfilled(authActions.avatarUpload),
});

listenerMiddleware.startListening({
	effect: () => {
		notifications.success(SuccessMessage.AVATAR_REMOVE);
	},
	matcher: isFulfilled(authActions.avatarRemove),
});

listenerMiddleware.startListening({
	effect: async () => {
		notifications.success(SuccessMessage.EMAIL_SENT);
		await navigation.navigateTo(AppRoute.SIGN_IN);
	},
	matcher: isAnyOf(
		authActions.sendResetLink.fulfilled,
		authActions.sendResetLink.rejected,
	),
});

listenerMiddleware.startListening({
	effect: async () => {
		notifications.success(SuccessMessage.PASSWORD_CHANGED);
		await navigation.navigateTo(AppRoute.SIGN_IN);
	},
	matcher: isFulfilled(authActions.resetPassword),
});

export { listenerMiddleware };
