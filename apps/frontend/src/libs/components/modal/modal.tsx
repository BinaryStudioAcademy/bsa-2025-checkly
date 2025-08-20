import { type FC, type ReactNode, useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

import { eventsNames } from "~/libs/constants/events-names.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import { Button } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
};

const Modal: FC<Properties> = ({ children, isOpen, onClose }) => {
	const dialogReference = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const openModal = (): void => {
			dialogReference.current?.showModal();
		};

		const closeModal = (): void => {
			dialogReference.current?.close();
		};

		if (isOpen) {
			openModal();
		} else {
			closeModal();
		}
	}, [isOpen]);

	useEffect(() => {
		const handleClose = (): void => {
			onClose();
		};

		const dialogElement = dialogReference.current;
		dialogElement?.addEventListener(eventsNames.CLOSE, handleClose);

		return (): void => {
			dialogElement?.removeEventListener(eventsNames.CLOSE, handleClose);
		};
	}, [onClose]);

	return (
		<dialog
			aria-modal="true"
			className={getClassNames("cluster", styles["modal-backdrop"])}
			ref={dialogReference}
		>
			<Button
				className={styles["modal-close-button"]}
				icon={<FiX className={styles["modal-close-icon"]} />}
				isIconOnly
				label=""
				onClick={onClose}
				type="button"
				variant="transparent"
			/>
			<div className={getClassNames(styles["modal-content"], "cluster")}>
				{children}
			</div>
		</dialog>
	);
};

export { Modal };
