import { type FC, type ReactNode, useEffect } from "react";

import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

type Properties = {
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
};

const Modal: FC<Properties> = ({ children, isOpen, onClose }) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent): void => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
		}

		return (): void => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose]);

	if (!isOpen) {
		return null;
	}

	return (
		<div aria-modal="true" className={styles["modal-backdrop"]} role="dialog">
			<div className={getClassNames(styles["modal-container"], "cluster")}>
				<button
					aria-label="Close modal"
					className={styles["modal-close-button"]}
					onClick={onClose}
					type="button"
				>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};

export { Modal };
