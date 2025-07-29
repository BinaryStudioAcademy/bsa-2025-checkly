import { type ToastOptions, Zoom } from "react-toastify";

import { NotificationOptionValues } from "./notification-option-values.enum.js";

const DefaultNotificationOptions: Readonly<ToastOptions> = {
	autoClose: NotificationOptionValues.AUTO_CLOSE_TIME,
	closeOnClick: false,
	draggable: true,
	hideProgressBar: true,
	pauseOnHover: true,
	position: "top-center",
	theme: "colored",
	transition: Zoom,
} as const;

export { DefaultNotificationOptions };
