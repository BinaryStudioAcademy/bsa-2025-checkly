import { createListenerMiddleware, isRejected } from "@reduxjs/toolkit";

import { ErrorMessage } from "~/libs/enums/error-messages.enum.js";
import { toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	effect: (action) => {
		const { message } = action.error;

		if (message?.trim()) {
			toastNotifier.error(action.error.message as string);
		} else {
			toastNotifier.error(ErrorMessage.DEFAULT_ERROR_MESSAGE);
		}
	},
	matcher: isRejected,
});

export { listenerMiddleware };
