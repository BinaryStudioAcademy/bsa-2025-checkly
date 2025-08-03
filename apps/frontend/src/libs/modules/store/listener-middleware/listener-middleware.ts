import {
	createListenerMiddleware,
	isAnyOf,
	isFulfilled,
	isRejected,
} from "@reduxjs/toolkit";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { ErrorMessage } from "~/libs/enums/error-messages.enum.js";
import { SuccessMessage } from "~/libs/enums/success-messages.enum.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";
import { signIn, signUp } from "~/modules/auth/slices/actions.js";

import { navigation } from "../../navigation/navigation.js";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	effect: (action) => {
		notifications.error(
			action.error.message?.trim() || ErrorMessage.DEFAULT_ERROR_MESSAGE,
		);
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

export { listenerMiddleware };
