import { toast, type ToastOptions, Zoom } from "react-toastify";

import { ToastOptionValues } from "~/libs/enums/enums.js";

class ToastNotifier {
	private toastOptions: ToastOptions = {
		autoClose: ToastOptionValues.AUTO_CLOSE_TIME,
		closeOnClick: false,
		draggable: true,
		hideProgressBar: true,
		pauseOnHover: true,
		position: "top-center",
		theme: "colored",
		transition: Zoom,
	};
	public error(message: string): string {
		return toast.error(message, this.toastOptions).toString();
	}

	public info(message: string): string {
		return toast.info(message, this.toastOptions).toString();
	}

	public success(message: string): string {
		return toast.success(message, this.toastOptions).toString();
	}
}

export { ToastNotifier };
