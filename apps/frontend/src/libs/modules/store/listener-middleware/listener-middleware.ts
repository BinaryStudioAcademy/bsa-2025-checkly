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
import {
	signIn,
	signUp,
	updateProfile,
} from "~/modules/auth/slices/actions.js";

import { navigation } from "../../navigation/navigation.js";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	effect: (action) => {
		notifications.error(getErrorMessage(action));
	},
	matcher: isRejected,
});

listenerMiddleware.startListening({
	async effect() {
		await navigation.navigateTo(AppRoute.ROOT);
	},
	matcher: isAnyOf(signIn.fulfilled, signUp.fulfilled),
});

listenerMiddleware.startListening({
	effect: () => {
		notifications.success(SuccessMessage.SIGN_UP);
	},
	matcher: isFulfilled(signUp),
});

listenerMiddleware.startListening({
	effect: () => {
		notifications.success(SuccessMessage.PROFILE_UPDATE);
	},
	matcher: isFulfilled(updateProfile),
});

export { listenerMiddleware };
