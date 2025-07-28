import { toast, type ToastOptions, Zoom } from "react-toastify";

import { NotificationOptionValues } from "~/libs/enums/enums.js";

class Notifications {
	private defaultNotificationOptions: Readonly<ToastOptions> = {
		autoClose: NotificationOptionValues.AUTO_CLOSE_TIME,
		closeOnClick: false,
		draggable: true,
		hideProgressBar: true,
		pauseOnHover: true,
		position: "top-center",
		theme: "colored",
		transition: Zoom,
	};

	public error(
		message: string,
		notificationOptions: ToastOptions = this.defaultNotificationOptions,
	): string {
		return toast.error(message, notificationOptions).toString();
	}

	public info(
		message: string,
		notificationOptions: ToastOptions = this.defaultNotificationOptions,
	): string {
		return toast.info(message, notificationOptions).toString();
	}

	public success(
		message: string,
		notificationOptions: ToastOptions = this.defaultNotificationOptions,
	): string {
		return toast.success(message, notificationOptions).toString();
	}
}

export { Notifications };
