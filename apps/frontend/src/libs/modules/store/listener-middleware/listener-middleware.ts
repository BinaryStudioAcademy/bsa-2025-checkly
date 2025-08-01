import {
	createListenerMiddleware,
	isAnyOf,
	isRejected,
} from "@reduxjs/toolkit";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { ErrorMessage } from "~/libs/enums/error-messages.enum.js";
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

export { listenerMiddleware };
