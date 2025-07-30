import { createListenerMiddleware, isRejected } from "@reduxjs/toolkit";

import { ErrorMessage } from "~/libs/enums/error-messages.enum.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	effect: (action) => {
		notifications.error(
			action.error.message?.trim() || ErrorMessage.DEFAULT_ERROR_MESSAGE,
		);
	},
	matcher: isRejected,
});

export { listenerMiddleware };
