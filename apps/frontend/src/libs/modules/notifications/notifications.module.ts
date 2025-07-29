import { toast, type ToastOptions, Zoom } from "react-toastify";

import { NotificationOptionValues } from "./libs/enums/notification-option-values.enum.js";

class Notifications {
	private static defaultNotificationOptions: Readonly<ToastOptions> = {
		autoClose: NotificationOptionValues.AUTO_CLOSE_TIME,
		closeOnClick: false,
		draggable: true,
		hideProgressBar: true,
		pauseOnHover: true,
		position: "top-center",
		theme: "colored",
		transition: Zoom,
	};

	private static setOptions(overrides?: Partial<ToastOptions>): ToastOptions {
		return { ...this.defaultNotificationOptions, ...overrides } as ToastOptions;
	}

	public error(
		message: string,
		notificationOptions?: Partial<ToastOptions>,
	): string {
		const customNotificationOptions =
			Notifications.setOptions(notificationOptions);

		return toast.error(message, customNotificationOptions).toString();
	}

	public info(
		message: string,
		notificationOptions?: Partial<ToastOptions>,
	): string {
		const customNotificationOptions =
			Notifications.setOptions(notificationOptions);

		return toast.info(message, customNotificationOptions).toString();
	}

	public success(
		message: string,
		notificationOptions?: Partial<ToastOptions>,
	): string {
		const customNotificationOptions =
			Notifications.setOptions(notificationOptions);

		return toast.success(message, customNotificationOptions).toString();
	}
}

export { Notifications };
