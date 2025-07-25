import { type Id, toast, Zoom } from "react-toastify";

import { ToastOptions } from "~/libs/enums/toast-options.enum.js";

const showErrorToast = (message: string): Id =>
	toast.error(message, {
		autoClose: ToastOptions.AUTO_CLOSE_TIME,
		closeOnClick: false,
		draggable: true,
		hideProgressBar: true,
		pauseOnHover: true,
		position: "top-center",
		theme: "colored",
		toastId: "errorId",
		transition: Zoom,
	});

export { showErrorToast };
