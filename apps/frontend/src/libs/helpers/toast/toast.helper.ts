import { type Id, toast, Zoom } from "react-toastify";

const showErrorToast = (message: string): Id =>
	toast.error(message, {
		autoClose: 3000,
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
